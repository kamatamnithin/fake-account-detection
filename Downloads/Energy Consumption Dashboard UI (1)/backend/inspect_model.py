"""
Model Inspector
Quick script to see what features your model expects
"""

import pickle
import os
from pathlib import Path

def inspect_model():
    """Inspect the Random Forest model and show feature requirements"""
    
    # Find the model
    model_path = 'random_forest_model.pkl'
    
    if not os.path.exists(model_path):
        print("❌ Model file 'random_forest_model.pkl' not found in backend folder")
        print("\nPlace your model file here:")
        print(f"   {Path(__file__).parent / 'random_forest_model.pkl'}")
        return
    
    # Load model
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("✅ Model loaded successfully\n")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return
    
    print("=" * 70)
    print("MODEL FEATURE REQUIREMENTS")
    print("=" * 70)
    
    # Show feature names if available
    if hasattr(model, 'feature_names_in_'):
        features = model.feature_names_in_.tolist()
        print(f"\n📋 Your model expects {len(features)} features:\n")
        
        for i, feature in enumerate(features, 1):
            print(f"   {i:2d}. {feature}")
        
        print("\n" + "=" * 70)
        print("COPY THIS TO UPDATE YOUR CODE")
        print("=" * 70)
        
        # Generate code snippets
        print("\n📝 For backend/app.py (preprocess_features function):\n")
        print("```python")
        print("# Features your model expects:")
        print(f"expected_features = {features}")
        print("df = df[expected_features]")
        print("```")
        
        print("\n📝 For frontend form (Prediction.tsx):\n")
        print("```typescript")
        print("const features = [{")
        print("  timestamp: dateTime,")
        for feature in features:
            if 'temperature' in feature.lower():
                print(f"  {feature}: parseFloat(temperature),")
            elif 'humidity' in feature.lower():
                print(f"  {feature}: parseFloat(humidity),")
            elif 'occupancy' in feature.lower():
                print(f"  {feature}: parseFloat(occupancy),")
            elif 'renewable' in feature.lower():
                print(f"  {feature}: parseFloat(renewableEnergy),")
            elif 'hvac' in feature.lower():
                print(f"  {feature}: hvacUsage === 'On' ? 1 : 0,")
            elif 'lighting' in feature.lower():
                print(f"  {feature}: lightingUsage === 'On' ? 1 : 0,")
            elif 'hour' in feature.lower():
                print(f"  {feature}: dt.getHours(),")
            elif 'day' in feature.lower() and 'week' in feature.lower():
                print(f"  {feature}: getDayNumber(dayOfWeek),")
            elif 'month' in feature.lower():
                print(f"  {feature}: dt.getMonth() + 1,")
            elif 'holiday' in feature.lower():
                print(f"  {feature}: isHoliday === 'Holiday' ? 1 : 0,")
            elif 'weekend' in feature.lower():
                print(f"  {feature}: [0, 6].includes(getDayNumber(dayOfWeek)) ? 1 : 0,")
            elif 'business' in feature.lower():
                print(f"  {feature}: (dt.getHours() >= 8 && dt.getHours() <= 18) ? 1 : 0,")
            else:
                print(f"  {feature}: 0,  // ⚠️ SET THIS VALUE")
        print("}];")
        print("```")
        
        print("\n" + "=" * 70)
        print("FEATURE TYPES")
        print("=" * 70)
        
        time_features = [f for f in features if any(word in f.lower() for word in ['hour', 'day', 'month', 'time', 'date', 'weekend', 'holiday', 'business'])]
        weather_features = [f for f in features if any(word in f.lower() for word in ['temp', 'humid', 'weather', 'wind', 'rain'])]
        building_features = [f for f in features if any(word in f.lower() for word in ['occupancy', 'hvac', 'lighting', 'people', 'renewable', 'solar'])]
        other_features = [f for f in features if f not in time_features + weather_features + building_features]
        
        if time_features:
            print("\n⏰ Time-based features:")
            for f in time_features:
                print(f"   • {f}")
        
        if weather_features:
            print("\n🌡️ Weather features:")
            for f in weather_features:
                print(f"   • {f}")
        
        if building_features:
            print("\n🏢 Building features:")
            for f in building_features:
                print(f"   • {f}")
        
        if other_features:
            print("\n❓ Other features:")
            for f in other_features:
                print(f"   • {f}")
        
    else:
        n_features = model.n_features_in_ if hasattr(model, 'n_features_in_') else 'unknown'
        print(f"\n⚠️ Your model expects {n_features} features")
        print("   But feature names are not stored in the model.")
        print("\n   This means your model was likely trained without column names.")
        print("   You'll need to remember the exact order of features used during training.")
    
    # Show model info
    print("\n" + "=" * 70)
    print("MODEL INFORMATION")
    print("=" * 70)
    print(f"\nType: {type(model).__name__}")
    
    if hasattr(model, 'n_estimators'):
        print(f"Trees: {model.n_estimators}")
    
    if hasattr(model, 'max_depth'):
        print(f"Max Depth: {model.max_depth}")
    
    if hasattr(model, 'feature_importances_'):
        print("\n" + "=" * 70)
        print("TOP 10 MOST IMPORTANT FEATURES")
        print("=" * 70)
        
        if hasattr(model, 'feature_names_in_'):
            importance_dict = {
                name: imp 
                for name, imp in zip(model.feature_names_in_, model.feature_importances_)
            }
            sorted_importance = sorted(importance_dict.items(), key=lambda x: x[1], reverse=True)
            
            print("\nFeature                           Importance")
            print("-" * 50)
            for feature, importance in sorted_importance[:10]:
                bar_length = int(importance * 50)
                bar = "█" * bar_length
                print(f"{feature:30s} {importance:6.4f} {bar}")
        else:
            importances = sorted(enumerate(model.feature_importances_), key=lambda x: x[1], reverse=True)
            print("\nFeature Index    Importance")
            print("-" * 30)
            for idx, imp in importances[:10]:
                print(f"Feature {idx:2d}      {imp:6.4f}")
    
    print("\n" + "=" * 70)
    print("✅ Inspection Complete!")
    print("=" * 70)
    print("\n💡 Next steps:")
    print("   1. Copy the feature list above")
    print("   2. Update backend/app.py with the expected features")
    print("   3. Ensure frontend sends all required features")
    print("   4. Run: python test_model.py")
    print("   5. Start the backend: python app.py")
    print("\n")

if __name__ == '__main__':
    inspect_model()
