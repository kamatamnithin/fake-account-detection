"""
SmartEnergy ML Prediction API - Professional Edition
Flask backend with data validation, rate limiting, and monitoring
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
from datetime import datetime
import os
import json
from typing import Dict, List, Any

# Import configuration
try:
    from config import config
    print("✅ Configuration loaded successfully")
except ImportError:
    print("⚠️  No config.py found, using defaults")
    class config:
        MODEL_PATH = 'random_forest_model.pkl'
        DEBUG = True
        HOST = '0.0.0.0'
        PORT = int(os.environ.get('PORT', 5000))
        CORS_ORIGINS = ['http://localhost:5173', 'http://localhost:3000']
        RATE_LIMIT_ENABLED = True
        RATE_LIMIT_DEFAULT = '200 per day, 50 per hour'
        RATE_LIMIT_PREDICT = '30 per minute'
        VALIDATION_STRICT = False
        VALIDATION_RULES = {
            'temperature': {'min': -50, 'max': 60, 'name': 'Temperature', 'unit': '°C'},
            'humidity': {'min': 0, 'max': 100, 'name': 'Humidity', 'unit': '%'},
            'occupancy': {'min': 0, 'max': 10000, 'name': 'Occupancy', 'unit': 'people'},
            'renewable': {'min': 0, 'max': 1000, 'name': 'Renewable Energy', 'unit': 'kW'},
        }
        WARNING_THRESHOLDS = {
            'temperature': {'min': -20, 'max': 45},
            'occupancy': {'max': 5000},
            'humidity': {'min': 10, 'max': 90}
        }

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=config.CORS_ORIGINS)

# Initialize rate limiter if enabled
limiter = None
if config.RATE_LIMIT_ENABLED:
    try:
        from flask_limiter import Limiter
        from flask_limiter.util import get_remote_address
        
        limiter = Limiter(
            app=app,
            key_func=get_remote_address,
            default_limits=[config.RATE_LIMIT_DEFAULT],
            storage_uri="memory://"
        )
        print("✅ Rate limiting enabled")
    except ImportError:
        print("⚠️  Flask-Limiter not installed, rate limiting disabled")
        print("   Install with: pip install Flask-Limiter")

# Global model variable
MODEL_PATH = config.MODEL_PATH
model = None

# Performance tracking
performance_metrics = {
    'total_predictions': 0,
    'successful_predictions': 0,
    'failed_predictions': 0,
    'avg_prediction': 0.0,
    'last_updated': None,
    'startup_time': datetime.now().isoformat()
}

predictions_history = []

# ============================================================================
# MODEL LOADING
# ============================================================================

def load_model():
    """Load the Random Forest model from pickle file"""
    global model
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
        return True
    except FileNotFoundError:
        print(f"❌ Model file not found: {MODEL_PATH}")
        print("📝 Please place your random_forest_model.pkl file in the /backend folder")
        return False
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        return False

# ============================================================================
# DATA VALIDATION
# ============================================================================

def validate_features(features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate input features with configurable rules
    Returns: {'valid': bool, 'errors': [], 'warnings': []}
    """
    errors = []
    warnings = []
    
    # Validate each feature against rules
    for field, rules in config.VALIDATION_RULES.items():
        if field in features:
            value = features[field]
            
            # Type validation
            if not isinstance(value, (int, float)):
                errors.append({
                    'field': field,
                    'value': value,
                    'message': f"{rules['name']} must be a number"
                })
                continue
            
            # Range validation
            if value < rules['min'] or value > rules['max']:
                error_msg = f"{rules['name']} must be between {rules['min']} and {rules['max']} {rules['unit']}"
                
                if config.VALIDATION_STRICT:
                    errors.append({
                        'field': field,
                        'value': value,
                        'expected_range': f"{rules['min']}-{rules['max']} {rules['unit']}",
                        'message': error_msg
                    })
                else:
                    warnings.append({
                        'field': field,
                        'value': value,
                        'message': error_msg + " (auto-corrected)"
                    })
                    # Auto-correct in non-strict mode
                    features[field] = max(rules['min'], min(rules['max'], value))
            
            # Warning thresholds for unusual values
            if field in config.WARNING_THRESHOLDS:
                thresholds = config.WARNING_THRESHOLDS[field]
                if 'min' in thresholds and value < thresholds['min']:
                    warnings.append({
                        'field': field,
                        'value': value,
                        'message': f"Unusually low {rules['name']}: {value}{rules['unit']}"
                    })
                if 'max' in thresholds and value > thresholds['max']:
                    warnings.append({
                        'field': field,
                        'value': value,
                        'message': f"Unusually high {rules['name']}: {value}{rules['unit']}"
                    })
    
    return {
        'valid': len(errors) == 0,
        'errors': errors,
        'warnings': warnings
    }

# ============================================================================
# PREDICTION HELPERS
# ============================================================================

def calculate_confidence_bounds(model, X, prediction):
    """Calculate confidence intervals for predictions"""
    try:
        if hasattr(model, 'estimators_'):
            # Random Forest: use tree predictions for uncertainty
            tree_predictions = np.array([tree.predict(X)[0] for tree in model.estimators_])
            std = np.std(tree_predictions)
            
            # 95% confidence interval
            lower_bound = prediction - 1.96 * std
            upper_bound = prediction + 1.96 * std
            
            # Calculate confidence score based on variance
            cv = std / prediction if prediction > 0 else 1.0
            confidence = max(0.5, min(0.99, 1.0 - cv))
        else:
            # Default bounds (±10%)
            lower_bound = prediction * 0.9
            upper_bound = prediction * 1.1
            confidence = 0.85
    except Exception as e:
        print(f"⚠️  Error calculating bounds: {e}")
        lower_bound = prediction * 0.9
        upper_bound = prediction * 1.1
        confidence = 0.85
    
    return {
        'lower_bound': float(max(0, lower_bound)),
        'upper_bound': float(upper_bound),
        'confidence': float(confidence)
    }

def update_metrics(prediction_value: float, success: bool = True):
    """Update performance metrics"""
    global performance_metrics, predictions_history
    
    performance_metrics['total_predictions'] += 1
    
    if success:
        performance_metrics['successful_predictions'] += 1
        predictions_history.append({
            'timestamp': datetime.now().isoformat(),
            'prediction': float(prediction_value)
        })
        
        # Keep only last 100 predictions
        if len(predictions_history) > 100:
            predictions_history = predictions_history[-100:]
        
        # Update average
        recent_preds = [p['prediction'] for p in predictions_history]
        performance_metrics['avg_prediction'] = float(np.mean(recent_preds))
    else:
        performance_metrics['failed_predictions'] += 1
    
    performance_metrics['last_updated'] = datetime.now().isoformat()

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint with system status"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'model_path': MODEL_PATH,
        'model_type': type(model).__name__ if model else None,
        'total_predictions': performance_metrics['total_predictions'],
        'uptime_since': performance_metrics['startup_time']
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Prediction endpoint with validation
    
    Expected JSON:
    {
        "features": [{
            "timestamp": "2024-01-15T14:30:00",
            "temperature": 22.5,
            "humidity": 65.0,
            "occupancy": 150,
            "renewable": 45.0,
            ...
        }],
        "include_confidence": true
    }
    """
    
    # Apply rate limiting if enabled
    if limiter:
        try:
            limiter.limit(config.RATE_LIMIT_PREDICT)(lambda: None)()
        except:
            pass
    
    # Check if model is loaded
    if model is None:
        return jsonify({
            'success': False,
            'error': 'Model not loaded',
            'message': 'Please place random_forest_model.pkl in the backend folder'
        }), 503
    
    try:
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid request format',
                'message': 'Expected JSON with "features" array'
            }), 400
        
        features_list = data['features']
        include_confidence = data.get('include_confidence', True)
        predictions = []
        all_warnings = []
        
        for idx, features in enumerate(features_list):
            # VALIDATE INPUT
            validation = validate_features(features)
            
            if not validation['valid']:
                update_metrics(0, success=False)
                return jsonify({
                    'success': False,
                    'error': 'Invalid input data',
                    'validation_errors': validation['errors'],
                    'index': idx
                }), 400
            
            # Collect warnings
            if validation['warnings']:
                all_warnings.extend(validation['warnings'])
            
            # Build a full feature vector that matches training order (16 features)
            # Training features order:
            # [consumption_lag_1h, consumption_lag_24h, consumption_lag_168h,
            #  temperature_rolling_24h, humidity_rolling_24h,
            #  hour_sin, hour_cos, day_sin, day_cos, month_sin, month_cos,
            #  avg_consumption_same_hour, avg_consumption_same_day,
            #  is_weekend, is_business_hour, renewable]

            # Parse timestamp if available
            ts = features.get('timestamp')
            try:
                t = pd.to_datetime(ts) if ts else None
            except Exception:
                t = None

            # Try to load history if available for better lag/rolling values
            hist = None
            hist_path = os.path.join(os.path.dirname(__file__), 'data', 'my_history.csv')
            if os.path.exists(hist_path):
                try:
                    hist = pd.read_csv(hist_path, parse_dates=['timestamp'])
                    hist = hist.sort_values('timestamp')
                except Exception:
                    hist = None

            def get_consumption_at(dt):
                if hist is None or dt is None:
                    return np.nan
                row = hist[hist['timestamp'] == dt]
                if not row.empty:
                    return float(row['consumption'].iloc[0])
                prev = hist[hist['timestamp'] < dt]
                if prev.empty:
                    return np.nan
                return float(prev['consumption'].iloc[-1])

            # LAGS
            lag1 = features.get('consumption_lag_1h')
            lag24 = features.get('consumption_lag_24h')
            lag168 = features.get('consumption_lag_168h')

            if lag1 is None and t is not None:
                lag1 = get_consumption_at(t - pd.Timedelta(hours=1))
            if lag24 is None and t is not None:
                lag24 = get_consumption_at(t - pd.Timedelta(hours=24))
            if lag168 is None and t is not None:
                lag168 = get_consumption_at(t - pd.Timedelta(hours=168))

            # Rolling weather (24h)
            temp_roll = features.get('temperature_rolling_24h')
            hum_roll = features.get('humidity_rolling_24h')
            if (temp_roll is None or hum_roll is None) and hist is not None and t is not None:
                window = hist[(hist['timestamp'] >= (t - pd.Timedelta(hours=24))) & (hist['timestamp'] < t)]
                if temp_roll is None:
                    temp_roll = float(window['temperature'].mean()) if not window.empty else float(features.get('temperature', 0))
                if hum_roll is None:
                    hum_roll = float(window['humidity'].mean()) if not window.empty else float(features.get('humidity', 0))

            # Averages by hour/day
            avg_same_hour = features.get('avg_consumption_same_hour')
            avg_same_day = features.get('avg_consumption_same_day')
            if (avg_same_hour is None or avg_same_day is None) and hist is not None and t is not None:
                same_hour = hist[(hist['timestamp'] < t) & (hist['timestamp'].dt.hour == t.hour)]['consumption']
                same_day = hist[(hist['timestamp'] < t) & (hist['timestamp'].dt.weekday == t.weekday())]['consumption']
                if avg_same_hour is None:
                    avg_same_hour = float(same_hour.mean()) if not same_hour.empty else 0.0
                if avg_same_day is None:
                    avg_same_day = float(same_day.mean()) if not same_day.empty else 0.0

            # Time-based features
            hour = None
            dow = None
            month = None
            if t is not None:
                hour = t.hour
                dow = t.weekday()
                month = t.month
            else:
                hour = features.get('hour', 0)
                dow = features.get('day_of_week', 0)
                month = features.get('month', 0)

            is_weekend = 1 if (dow is not None and int(dow) >= 5) else int(features.get('is_weekend', 0))
            is_business_hour = 1 if (hour is not None and 8 <= int(hour) <= 18) else int(features.get('is_business_hour', 0))

            hour = int(hour) if hour is not None else 0
            dow = int(dow) if dow is not None else 0
            month = int(month) if month is not None else 0

            hour_sin = np.sin(2 * np.pi * hour / 24)
            hour_cos = np.cos(2 * np.pi * hour / 24)
            day_sin = np.sin(2 * np.pi * dow / 7)
            day_cos = np.cos(2 * np.pi * dow / 7)
            month_sin = np.sin(2 * np.pi * month / 12)
            month_cos = np.cos(2 * np.pi * month / 12)

            renewable = features.get('renewable', 0.0)

            # Safely fill numeric defaults
            def safe(val, default=0.0):
                try:
                    return float(val) if val is not None and not (isinstance(val, float) and np.isnan(val)) else float(default)
                except Exception:
                    return float(default)

            feature_values = [
                safe(lag1, 0.0),
                safe(lag24, 0.0),
                safe(lag168, 0.0),
                safe(temp_roll, safe(features.get('temperature', 0.0))),
                safe(hum_roll, safe(features.get('humidity', 0.0))),
                float(hour_sin),
                float(hour_cos),
                float(day_sin),
                float(day_cos),
                float(month_sin),
                float(month_cos),
                safe(avg_same_hour, 0.0),
                safe(avg_same_day, 0.0),
                float(is_weekend),
                float(is_business_hour),
                safe(renewable, 0.0)
            ]

            # Make prediction
            X = np.array([feature_values])
            prediction = model.predict(X)[0]

            # Calculate confidence bounds
            bounds = calculate_confidence_bounds(model, X, prediction) if include_confidence else {}

            # Build result
            result = {
                'index': idx,
                'timestamp': features.get('timestamp'),
                'predicted': float(prediction),
            }
            
            if include_confidence:
                result.update(bounds)
            
            predictions.append(result)
            
            # Update metrics
            update_metrics(prediction, success=True)
        
        response = {
            'success': True,
            'predictions': predictions,
            'model_info': {
                'type': type(model).__name__,
                'features_used': len(feature_values)
            }
        }
        
        # Include warnings if any
        if all_warnings:
            response['warnings'] = all_warnings
        
        return jsonify(response)
        
    except Exception as e:
        update_metrics(0, success=False)
        print(f"❌ Prediction error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Error during prediction'
        }), 500


@app.route('/api/predict/from-history', methods=['POST'])
def predict_from_history():
    """Build lag-based features from stored historical CSV and predict."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Invalid request'}), 400
        timestamp = data.get('timestamp')
        base = data.get('base_features', {})
        if timestamp is None:
            return jsonify({'success': False, 'error': 'timestamp required (e.g. 2024-01-01T00:00:00)'}), 400

        # Parse timestamp
        try:
            t = pd.to_datetime(timestamp)
        except Exception:
            return jsonify({'success': False, 'error': 'Invalid timestamp format'}), 400

        # Load history
        hist_path = os.path.join(os.path.dirname(__file__), 'data', 'my_history.csv')
        if not os.path.exists(hist_path):
            return jsonify({'success': False, 'error': 'Historical data not available on server'}), 500

        hist = pd.read_csv(hist_path, parse_dates=['timestamp'])
        hist = hist.sort_values('timestamp')

        # Helper to get consumption at exact datetime, fallback to nearest earlier
        def get_consumption_at(dt):
            row = hist[hist['timestamp'] == dt]
            if not row.empty:
                return float(row['consumption'].iloc[0])
            prev = hist[hist['timestamp'] < dt]
            if prev.empty:
                return float(np.nan)
            return float(prev['consumption'].iloc[-1])

        lag1 = get_consumption_at(t - pd.Timedelta(hours=1))
        lag24 = get_consumption_at(t - pd.Timedelta(hours=24))
        lag168 = get_consumption_at(t - pd.Timedelta(hours=168))

        # Rolling weather averages (previous 24h)
        window = hist[(hist['timestamp'] >= (t - pd.Timedelta(hours=24))) & (hist['timestamp'] < t)]
        temp_roll = float(window['temperature'].mean()) if not window.empty else float(base.get('temperature', 0))
        hum_roll = float(window['humidity'].mean()) if not window.empty else float(base.get('humidity', 0))

        # Historical averages
        same_hour = hist[(hist['timestamp'] < t) & (hist['timestamp'].dt.hour == t.hour)]['consumption']
        avg_same_hour = float(same_hour.mean()) if not same_hour.empty else float(np.nan)
        same_day = hist[(hist['timestamp'] < t) & (hist['timestamp'].dt.weekday == t.weekday())]['consumption']
        avg_same_day = float(same_day.mean()) if not same_day.empty else float(np.nan)

        # Fill defaults if NaN
        lag1 = lag1 if not np.isnan(lag1) else (avg_same_hour if not np.isnan(avg_same_hour) else 0.0)
        lag24 = lag24 if not np.isnan(lag24) else (avg_same_day if not np.isnan(avg_same_day) else 0.0)
        lag168 = lag168 if not np.isnan(lag168) else lag24
        temp_roll = temp_roll if not np.isnan(temp_roll) else float(base.get('temperature', 0))
        hum_roll = hum_roll if not np.isnan(hum_roll) else float(base.get('humidity', 0))
        avg_same_hour = avg_same_hour if not np.isnan(avg_same_hour) else 0.0
        avg_same_day = avg_same_day if not np.isnan(avg_same_day) else 0.0

        # Build features in the same order as training
        hour = t.hour
        dow = t.weekday()
        month = t.month
        is_weekend = 1 if dow >= 5 else 0
        is_business_hour = 1 if 8 <= hour <= 18 else 0

        hour_sin = np.sin(2 * np.pi * hour / 24)
        hour_cos = np.cos(2 * np.pi * hour / 24)
        day_sin = np.sin(2 * np.pi * dow / 7)
        day_cos = np.cos(2 * np.pi * dow / 7)
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)

        feature_values = [
            float(lag1),
            float(lag24),
            float(lag168),
            float(temp_roll),
            float(hum_roll),
            float(hour_sin),
            float(hour_cos),
            float(day_sin),
            float(day_cos),
            float(month_sin),
            float(month_cos),
            float(avg_same_hour),
            float(avg_same_day),
            float(is_weekend),
            float(is_business_hour),
            float(base.get('renewable', 0.0))
        ]

        X = np.array([feature_values])

        if model is None:
            return jsonify({'success': False, 'error': 'Model not loaded'}), 503

        prediction = float(model.predict(X)[0])
        bounds = calculate_confidence_bounds(model, X, prediction)

        return jsonify({
            'success': True,
            'timestamp': timestamp,
            'predicted': prediction,
            'lower_bound': bounds['lower_bound'],
            'upper_bound': bounds['upper_bound'],
            'confidence': bounds['confidence']
        })

    except Exception as e:
        print(f"❌ from-history error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Get detailed information about the loaded model"""
    if model is None:
        return jsonify({
            'success': False,
            'model_loaded': False,
            'error': 'Model not loaded'
        }), 503
    
    info = {
        'success': True,
        'model_loaded': True,
        'model_type': type(model).__name__,
    }
    
    # Extract model metadata
    try:
        if hasattr(model, 'n_estimators'):
            info['n_estimators'] = model.n_estimators
        if hasattr(model, 'n_features_in_'):
            info['n_features'] = model.n_features_in_
        if hasattr(model, 'feature_names_in_'):
            info['feature_names'] = model.feature_names_in_.tolist()
        if hasattr(model, 'feature_importances_'):
            # Get top 10 most important features
            importances = model.feature_importances_
            if hasattr(model, 'feature_names_in_'):
                feature_importance = dict(zip(
                    model.feature_names_in_,
                    importances.tolist()
                ))
            else:
                feature_importance = {f'feature_{i}': imp for i, imp in enumerate(importances)}
            
            # Sort by importance
            sorted_features = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
            info['top_features'] = dict(sorted_features[:10])
    except Exception as e:
        print(f"⚠️  Error extracting model info: {e}")
    
    return jsonify(info)

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get API performance metrics"""
    return jsonify({
        'success': True,
        'metrics': performance_metrics,
        'recent_predictions': predictions_history[-20:] if predictions_history else []
    })

@app.route('/api/validate', methods=['POST'])
def validate_input():
    """Validate input features without making prediction"""
    try:
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid request format'
            }), 400
        
        features = data['features'][0] if isinstance(data['features'], list) else data['features']
        validation = validate_features(features)
        
        return jsonify({
            'success': True,
            'validation': validation
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/reload-model', methods=['POST'])
def reload_model():
    """Reload the model from disk"""
    success = load_model()
    return jsonify({
        'success': success,
        'message': 'Model reloaded successfully' if success else 'Failed to reload model',
        'model_type': type(model).__name__ if model else None
    })

# ============================================================================
# STARTUP
# ============================================================================

# Try to load model on startup
model_loaded = load_model()

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("🚀 SmartEnergy ML Prediction API - Professional Edition")
    print("=" * 60)
    
    if model_loaded:
        print("✅ Model loaded and ready!")
        print(f"📊 Model type: {type(model).__name__}")
        if hasattr(model, 'n_estimators'):
            print(f"🌲 Trees: {model.n_estimators}")
        if hasattr(model, 'n_features_in_'):
            print(f"📈 Features: {model.n_features_in_}")
    else:
        print("⚠️  Model not loaded - predictions will fail")
        print("📝 To fix: Place 'random_forest_model.pkl' in the /backend folder")
    
    print(f"\n📝 Configuration: {os.environ.get('FLASK_ENV', 'development').upper()}")
    print(f"🔒 Rate limiting: {'ENABLED' if config.RATE_LIMIT_ENABLED else 'DISABLED'}")
    print(f"✅ Data validation: {'STRICT' if config.VALIDATION_STRICT else 'LENIENT'}")
    
    print(f"\n📡 Starting server on http://{config.HOST}:{config.PORT}")
    print("=" * 60)
    print("\n✨ Endpoints:")
    print("  GET  /api/health       - Health check & status")
    print("  POST /api/predict      - Make predictions (validated)")
    print("  GET  /api/model-info   - Model information")
    print("  GET  /api/metrics      - Performance metrics")
    print("  POST /api/validate     - Validate input without prediction")
    print("  POST /api/reload-model - Reload model from disk")
    print("=" * 60)
    print("\n💡 Pro Tips:")
    print("  • Use /api/validate to test inputs before prediction")
    print("  • Check /api/metrics to monitor performance")
    print("  • Data validation is automatic on all predictions")
    print("  • Rate limiting protects against API abuse")
    print("=" * 60 + "\n")
    
    app.run(debug=config.DEBUG, host=config.HOST, port=config.PORT)
