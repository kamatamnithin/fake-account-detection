"""
Test Script for Random Forest Model
Helps you verify your model works correctly
"""

import pickle
import pandas as pd
import numpy as np
from pathlib import Path
import os

def test_model():
    """Test if the Random Forest model can be loaded and used"""
    
    print("=" * 60)
    print("Testing Random Forest Model")
    print("=" * 60)
    
    # Try to find the model
    possible_paths = [
        'random_forest_model.pkl',
        '../random_forest_model.pkl',
        Path(__file__).parent / 'random_forest_model.pkl'
    ]
    
    model = None
    model_path = None
    
    for path in possible_paths:
        if os.path.exists(path):
            model_path = path
            print(f"\n✓ Found model at: {path}")
            break
    
    if not model_path:
        print("\n✗ ERROR: Model file not found!")
        print("\nPlease place 'random_forest_model.pkl' in the backend folder")
        print("\nSearched in:")
        for path in possible_paths:
            print(f"  - {path}")
        return False
    
    # Load the model
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("✓ Model loaded successfully")
    except Exception as e:
        print(f"\n✗ ERROR loading model: {str(e)}")
        return False
    
    # Get model information
    print("\n" + "=" * 60)
    print("Model Information")
    print("=" * 60)
    
    print(f"\nModel Type: {type(model).__name__}")
    
    if hasattr(model, 'n_estimators'):
        print(f"Number of Trees: {model.n_estimators}")
    
    if hasattr(model, 'max_depth'):
        print(f"Max Depth: {model.max_depth}")
    
    if hasattr(model, 'n_features_in_'):
        print(f"\nNumber of Features: {model.n_features_in_}")
    
    if hasattr(model, 'feature_names_in_'):
        print(f"\nFeature Names:")
        for i, feature in enumerate(model.feature_names_in_, 1):
            print(f"  {i}. {feature}")
        
        # ⚠️ CHECK FOR DATA LEAKAGE
        print("\n" + "=" * 60)
        print("⚠️  DATA LEAKAGE CHECK")
        print("=" * 60)
        
        leakage_features = []
        proper_features = []
        
        for feature in model.feature_names_in_:
            # Check for problematic same-timestamp features
            if any(term in feature.lower() for term in ['hvac_status', 'lighting_status', 'occupancy']) and 'lag' not in feature.lower():
                leakage_features.append(feature)
            # Check for raw hour (should use sin/cos)
            elif feature.lower() == 'hour' or feature.lower() == 'day_of_week':
                leakage_features.append(f"{feature} (should use sin/cos encoding)")
            # Check for proper lag features
            elif 'lag' in feature.lower() or 'sin' in feature.lower() or 'cos' in feature.lower():
                proper_features.append(feature)
        
        if leakage_features:
            print("\n❌ WARNING: Potential data leakage detected!")
            print("\nProblematic features (same-timestamp):")
            for feat in leakage_features:
                print(f"  ❌ {feat}")
            print("\n⚠️  These features can cause ~99% R² but fail in production!")
            print("   Use LAG features instead (e.g., hvac_lag_1h)")
            print("\n📖 Read: FEATURE_ENGINEERING_GUIDE.md for details")
        else:
            print("\n✅ No obvious data leakage detected!")
        
        if proper_features:
            print("\n✅ Good features found (lag-based or cyclical):")
            for feat in proper_features[:5]:
                print(f"  ✅ {feat}")
            if len(proper_features) > 5:
                print(f"  ... and {len(proper_features) - 5} more")
    else:
        print("\nWARNING: Model doesn't have feature names")
        print("Your model was likely trained without column names")
    
    # Try to make a test prediction
    print("\n" + "=" * 60)
    print("Test Prediction")
    print("=" * 60)
    
    try:
        # Create sample data based on model's expected features
        if hasattr(model, 'feature_names_in_'):
            # Use actual feature names
            test_data = {}
            for feature in model.feature_names_in_:
                # Provide reasonable default values
                if 'temperature' in feature.lower():
                    test_data[feature] = 24.3
                elif 'humidity' in feature.lower():
                    test_data[feature] = 62.5
                elif 'occupancy' in feature.lower():
                    test_data[feature] = 1800
                elif 'renewable' in feature.lower():
                    test_data[feature] = 55
                elif 'hour' in feature.lower():
                    test_data[feature] = 12
                elif 'day' in feature.lower() and 'week' in feature.lower():
                    test_data[feature] = 0  # Monday
                elif 'month' in feature.lower():
                    test_data[feature] = 1
                elif 'hvac' in feature.lower():
                    test_data[feature] = 1
                elif 'lighting' in feature.lower():
                    test_data[feature] = 1
                elif 'holiday' in feature.lower():
                    test_data[feature] = 0
                elif 'weekend' in feature.lower():
                    test_data[feature] = 0
                elif 'business' in feature.lower():
                    test_data[feature] = 1
                else:
                    test_data[feature] = 0
            
            df = pd.DataFrame([test_data])
            print("\nTest input features:")
            for col, val in test_data.items():
                print(f"  {col}: {val}")
        else:
            # Create generic numeric data
            n_features = model.n_features_in_
            test_data = np.random.rand(1, n_features)
            df = pd.DataFrame(test_data)
            print(f"\nUsing {n_features} random features (model has no feature names)")
        
        # Make prediction
        prediction = model.predict(df)
        
        print(f"\n✓ Prediction successful!")
        print(f"\nPredicted Energy Consumption: {prediction[0]:.2f} kWh")
        
        # Try to get confidence if available
        if hasattr(model, 'predict_proba'):
            print("\nModel supports probability predictions")
        
        if hasattr(model, 'feature_importances_'):
            print("\nTop 5 Most Important Features:")
            if hasattr(model, 'feature_names_in_'):
                importances = pd.DataFrame({
                    'feature': model.feature_names_in_,
                    'importance': model.feature_importances_
                }).sort_values('importance', ascending=False)
                
                for idx, row in importances.head(5).iterrows():
                    print(f"  {row['feature']}: {row['importance']:.4f}")
            else:
                importances = sorted(enumerate(model.feature_importances_), 
                                   key=lambda x: x[1], reverse=True)
                for idx, imp in importances[:5]:
                    print(f"  Feature {idx}: {imp:.4f}")
        
        print("\n" + "=" * 60)
        print("✓ All tests passed!")
        print("=" * 60)
        
        print("\n📋 Next Steps:")
        print("1. Start the backend server: python app.py")
        print("2. The server will use this model for predictions")
        print("3. Frontend will send features matching the model's needs")
        
        return True
        
    except Exception as e:
        print(f"\n✗ ERROR making prediction: {str(e)}")
        print("\nThis usually means:")
        print("1. Feature mismatch (wrong number or names)")
        print("2. Model expects preprocessed data")
        print("3. Model is corrupted")
        return False

if __name__ == '__main__':
    success = test_model()
    
    if not success:
        print("\n" + "=" * 60)
        print("⚠ Model testing failed")
        print("=" * 60)
        print("\nPlease fix the issues above and run again")
        exit(1)
    else:
        print("\n🎉 Your model is ready to use!")
        exit(0)