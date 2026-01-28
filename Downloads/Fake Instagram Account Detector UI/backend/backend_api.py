from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Load models
print("Loading models...")
try:
    with open('classifier_model.pkl', 'rb') as f:
        clf = pickle.load(f)
    print("✓ Classifier model loaded")
except Exception as e:
    print(f"✗ Error loading classifier: {e}")
    clf = None

try:
    with open('scaler_model.pkl', 'rb') as f:
        scaler = pickle.load(f)
    print("✓ Scaler model loaded")
except Exception as e:
    print(f"✗ Error loading scaler: {e}")
    scaler = None

try:
    with open('feature_names.pkl', 'rb') as f:
        feature_names = pickle.load(f)
    print(f"✓ Feature names loaded: {len(feature_names)} features")
except Exception as e:
    print(f"✗ Error loading feature names: {e}")
    feature_names = None

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Backend is running',
        'models_loaded': clf is not None and scaler is not None
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """Analyze Instagram account and predict if it's fake or real"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        if clf is None or scaler is None:
            return jsonify({'error': 'Models not loaded'}), 500
        
        # Extract features in the correct order
        features = []
        for fname in feature_names:
            # Try to get the value from request data
            value = data.get(fname, 0)
            # Convert to float, default to 0 if conversion fails
            try:
                value = float(value)
            except:
                value = 0.0
            features.append(value)
        
        # Convert to numpy array
        X = np.array([features])
        
        # Scale features
        X_scaled = scaler.transform(X)
        
        # Make prediction
        prediction = clf.predict(X_scaled)[0]
        probabilities = clf.predict_proba(X_scaled)[0]
        
        # Determine status
        status = "Likely Fake" if prediction == 1 else "Likely Real"
        confidence = float(max(probabilities)) * 100
        fake_probability = float(probabilities[1]) * 100
        real_probability = float(probabilities[0]) * 100
        
        # Determine risk level
        if fake_probability > 70:
            risk_level = "High Risk"
        elif fake_probability > 40:
            risk_level = "Medium Risk"
        else:
            risk_level = "Low Risk"
        
        response = {
            'status': status,
            'is_fake': bool(prediction),
            'confidence': round(confidence, 2),
            'fake_probability': round(fake_probability, 2),
            'real_probability': round(real_probability, 2),
            'risk_level': risk_level,
            'timestamp': datetime.now().isoformat(),
            'features_received': len(features),
            'features_expected': len(feature_names)
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        print(f"Error in /api/analyze: {e}")
        return jsonify({'error': str(e), 'status': 'error'}), 500

@app.route('/api/batch-analyze', methods=['POST'])
def batch_analyze():
    """Analyze multiple accounts at once"""
    try:
        data = request.get_json()
        
        if not isinstance(data, list):
            return jsonify({'error': 'Expected list of accounts'}), 400
        
        if clf is None or scaler is None:
            return jsonify({'error': 'Models not loaded'}), 500
        
        results = []
        for account in data:
            features = []
            for fname in feature_names:
                value = account.get(fname, 0)
                try:
                    value = float(value)
                except:
                    value = 0.0
                features.append(value)
            
            X = np.array([features])
            X_scaled = scaler.transform(X)
            prediction = clf.predict(X_scaled)[0]
            probabilities = clf.predict_proba(X_scaled)[0]
            
            status = "Likely Fake" if prediction == 1 else "Likely Real"
            confidence = float(max(probabilities)) * 100
            fake_probability = float(probabilities[1]) * 100
            
            if fake_probability > 70:
                risk_level = "High Risk"
            elif fake_probability > 40:
                risk_level = "Medium Risk"
            else:
                risk_level = "Low Risk"
            
            results.append({
                'status': status,
                'is_fake': bool(prediction),
                'confidence': round(confidence, 2),
                'fake_probability': round(fake_probability, 2),
                'risk_level': risk_level
            })
        
        return jsonify({
            'count': len(results),
            'results': results,
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        print(f"Error in /api/batch-analyze: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/features', methods=['GET'])
def get_features():
    """Get list of required features"""
    if feature_names is None:
        return jsonify({'error': 'Feature names not loaded'}), 500
    
    return jsonify({
        'features': feature_names,
        'count': len(feature_names)
    }), 200

@app.route('/', methods=['GET'])
def index():
    """API info endpoint"""
    return jsonify({
        'service': 'Fake Instagram Account Detector',
        'version': '2.0',
        'endpoints': {
            'GET /api/health': 'Health check',
            'POST /api/analyze': 'Analyze single account',
            'POST /api/batch-analyze': 'Analyze multiple accounts',
            'GET /api/features': 'Get required features'
        }
    }), 200

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'
    print(f"Starting Flask server on port {port}...")
    print("=" * 60)
    app.run(host=host, port=port, debug=False)
