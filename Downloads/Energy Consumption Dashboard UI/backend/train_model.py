"""
REAL AI MODEL TRAINING - SmartEnergy Platform
Train a Random Forest model with proper time series features
Following Manish Nathrani's recommendations for lag-based features
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pickle
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

print("=" * 70)
print("🤖 TRAINING REAL ML MODEL - SmartEnergy Energy Forecasting")
print("=" * 70)
print("\n📚 Following best practices:")
print("  ✓ Lag-based features (t-1h, t-24h, t-168h)")
print("  ✓ Cyclical time encoding (sine/cosine)")
print("  ✓ Rolling weather averages")
print("  ✓ NO data leakage (no current values as features)")
print("=" * 70)

# ============================================================================
# STEP 1: GENERATE SYNTHETIC TRAINING DATA
# ============================================================================

print("\n📊 STEP 1: Generating synthetic training data...")
print("   (Replace this with your actual historical data)")

def generate_training_data(n_samples=10000):
    """
    Generate synthetic energy consumption data
    
    REPLACE THIS WITH YOUR ACTUAL DATA:
    df = pd.read_csv('your_historical_data.csv')
    """
    
    np.random.seed(42)
    
    # Generate timestamps (1 year of hourly data)
    start_date = datetime.now() - timedelta(days=365)
    timestamps = [start_date + timedelta(hours=i) for i in range(n_samples)]
    
    data = []
    
    for ts in timestamps:
        hour = ts.hour
        day_of_week = ts.weekday()
        month = ts.month
        is_weekend = 1 if day_of_week >= 5 else 0
        is_business_hour = 1 if 8 <= hour <= 18 else 0
        
        # Simulate realistic patterns
        # Base load
        base_consumption = 50
        
        # Time-based patterns
        hour_factor = 1.0
        if 6 <= hour <= 9:  # Morning peak
            hour_factor = 1.3
        elif 18 <= hour <= 22:  # Evening peak
            hour_factor = 1.4
        elif 0 <= hour <= 5:  # Night low
            hour_factor = 0.6
        
        # Weekend reduction
        weekend_factor = 0.7 if is_weekend else 1.0
        
        # Seasonal variation
        seasonal_factor = 1.0
        if month in [12, 1, 2]:  # Winter - more heating
            seasonal_factor = 1.3
        elif month in [6, 7, 8]:  # Summer - more cooling
            seasonal_factor = 1.2
        
        # Weather simulation
        temperature = 15 + 10 * np.sin((month - 1) / 12 * 2 * np.pi) + np.random.normal(0, 3)
        humidity = 50 + 20 * np.sin((month - 1) / 12 * 2 * np.pi) + np.random.normal(0, 10)
        
        # Occupancy
        if is_business_hour and not is_weekend:
            occupancy = np.random.randint(800, 2000)
        else:
            occupancy = np.random.randint(100, 500)
        
        # HVAC and Lighting
        hvac_status = 1 if (temperature < 18 or temperature > 24) else 0
        lighting_status = 1 if (hour >= 6 and hour <= 22) else 0
        
        # Renewable energy (solar peaks during day)
        renewable = max(0, 100 * np.sin((hour - 6) / 12 * np.pi)) if 6 <= hour <= 18 else 0
        renewable = renewable * (0.8 + np.random.random() * 0.4)  # Variability
        
        # Calculate actual consumption
        consumption = (
            base_consumption * hour_factor * weekend_factor * seasonal_factor
            + (abs(temperature - 22) * 1.5)  # Temperature impact
            + (occupancy / 50)  # Occupancy impact
            + (hvac_status * 15)  # HVAC impact
            + (lighting_status * 8)  # Lighting impact
            - (renewable / 10)  # Renewable reduction
            + np.random.normal(0, 5)  # Random noise
        )
        
        consumption = max(20, consumption)  # Minimum consumption
        
        data.append({
            'timestamp': ts,
            'temperature': temperature,
            'humidity': humidity,
            'occupancy': occupancy,
            'renewable': renewable,
            'hvac_status': hvac_status,
            'lighting_status': lighting_status,
            'hour': hour,
            'day_of_week': day_of_week,
            'month': month,
            'is_weekend': is_weekend,
            'is_business_hour': is_business_hour,
            'consumption': consumption  # TARGET
        })
    
    return pd.DataFrame(data)

# Generate data
df = generate_training_data(n_samples=10000)
print(f"   ✓ Generated {len(df)} samples")
print(f"   ✓ Date range: {df['timestamp'].min()} to {df['timestamp'].max()}")

# ============================================================================
# STEP 2: CREATE LAG FEATURES (PREVENT DATA LEAKAGE!)
# ============================================================================

print("\n🔧 STEP 2: Creating lag-based features (NO DATA LEAKAGE)...")

def create_lag_features(df):
    """
    Create proper time series features with lags
    Following Manish Nathrani's recommendations
    """
    
    df = df.sort_values('timestamp').copy()
    
    # LAG FEATURES - Use historical values, not current!
    print("   ✓ Creating lag features...")
    df['consumption_lag_1h'] = df['consumption'].shift(1)  # Previous hour
    df['consumption_lag_24h'] = df['consumption'].shift(24)  # Same time yesterday
    df['consumption_lag_168h'] = df['consumption'].shift(168)  # Same time last week
    
    # ROLLING FEATURES - Weather averages
    print("   ✓ Creating rolling weather features...")
    df['temperature_rolling_24h'] = df['temperature'].rolling(window=24, min_periods=1).mean()
    df['humidity_rolling_24h'] = df['humidity'].rolling(window=24, min_periods=1).mean()
    
    # CYCLICAL TIME ENCODING - Sine/Cosine transformations
    print("   ✓ Creating cyclical time encodings...")
    df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
    df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
    df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
    df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
    df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
    df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
    
    # HISTORICAL PATTERNS
    print("   ✓ Creating historical pattern features...")
    df['avg_consumption_same_hour'] = df.groupby('hour')['consumption'].transform(
        lambda x: x.shift(1).expanding().mean()
    )
    df['avg_consumption_same_day'] = df.groupby('day_of_week')['consumption'].transform(
        lambda x: x.shift(1).expanding().mean()
    )
    
    # Drop rows with NaN (from lagging)
    df = df.dropna()
    
    return df

df = create_lag_features(df)
print(f"   ✓ Created lag features")
print(f"   ✓ Remaining samples after lag creation: {len(df)}")

# ============================================================================
# STEP 3: PREPARE FEATURES (NO CURRENT VALUES!)
# ============================================================================

print("\n📋 STEP 3: Preparing feature set...")

# IMPORTANT: NO current HVAC, lighting, or occupancy!
# Only use LAGGED values and derived features

feature_columns = [
    # LAG FEATURES (Historical consumption)
    'consumption_lag_1h',
    'consumption_lag_24h', 
    'consumption_lag_168h',
    
    # ROLLING WEATHER AVERAGES (Not current!)
    'temperature_rolling_24h',
    'humidity_rolling_24h',
    
    # CYCLICAL TIME ENCODINGS
    'hour_sin',
    'hour_cos',
    'day_sin',
    'day_cos',
    'month_sin',
    'month_cos',
    
    # HISTORICAL PATTERNS
    'avg_consumption_same_hour',
    'avg_consumption_same_day',
    
    # CATEGORICAL TIME FEATURES
    'is_weekend',
    'is_business_hour',
    
    # Renewable (can use current as it's a prediction input)
    'renewable',
]

X = df[feature_columns]
y = df['consumption']

print(f"   ✓ Features: {len(feature_columns)}")
print(f"   ✓ Samples: {len(X)}")
print(f"\n   📊 Feature list:")
for i, feat in enumerate(feature_columns, 1):
    print(f"      {i}. {feat}")

# ============================================================================
# STEP 4: TRAIN/TEST SPLIT (TIME-BASED!)
# ============================================================================

print("\n✂️  STEP 4: Splitting data (TIME-BASED split)...")

# Use last 20% for testing (chronological)
split_idx = int(len(X) * 0.8)
X_train = X.iloc[:split_idx]
X_test = X.iloc[split_idx:]
y_train = y.iloc[:split_idx]
y_test = y.iloc[split_idx:]

print(f"   ✓ Training set: {len(X_train)} samples")
print(f"   ✓ Test set: {len(X_test)} samples")

# ============================================================================
# STEP 5: TRAIN MODEL
# ============================================================================

print("\n🌲 STEP 5: Training Random Forest model...")

model = RandomForestRegressor(
    n_estimators=100,  # Number of trees
    max_depth=20,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42,
    n_jobs=-1,  # Use all CPU cores
    verbose=0
)

print("   ⏳ Training in progress...")
model.fit(X_train, y_train)
print("   ✓ Training complete!")

# ============================================================================
# STEP 6: EVALUATE MODEL
# ============================================================================

print("\n📈 STEP 6: Evaluating model performance...")

# Predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Metrics
train_mae = mean_absolute_error(y_train, y_train_pred)
test_mae = mean_absolute_error(y_test, y_test_pred)
train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
train_r2 = r2_score(y_train, y_train_pred)
test_r2 = r2_score(y_test, y_test_pred)

print("\n" + "=" * 70)
print("📊 MODEL PERFORMANCE METRICS")
print("=" * 70)
print(f"\n   TRAINING SET:")
print(f"      MAE:  {train_mae:.2f} kWh")
print(f"      RMSE: {train_rmse:.2f} kWh")
print(f"      R²:   {train_r2:.4f}")

print(f"\n   TEST SET:")
print(f"      MAE:  {test_mae:.2f} kWh")
print(f"      RMSE: {test_rmse:.2f} kWh")
print(f"      R²:   {test_r2:.4f}")

# Cross-validation
print("\n   🔄 Cross-validation (5-fold)...")
cv_scores = cross_val_score(model, X_train, y_train, cv=5, 
                            scoring='neg_mean_absolute_error', n_jobs=-1)
cv_mae = -cv_scores.mean()
print(f"      CV MAE: {cv_mae:.2f} kWh (± {cv_scores.std():.2f})")

print("=" * 70)

# ============================================================================
# STEP 7: FEATURE IMPORTANCE
# ============================================================================

print("\n🎯 STEP 7: Feature importance analysis...")

importances = model.feature_importances_
feature_importance = pd.DataFrame({
    'feature': feature_columns,
    'importance': importances
}).sort_values('importance', ascending=False)

print("\n   TOP 10 MOST IMPORTANT FEATURES:")
for idx, row in feature_importance.head(10).iterrows():
    print(f"      {row['feature']:30s} {row['importance']*100:5.2f}%")

# Check for data leakage
max_importance = feature_importance['importance'].max()
if max_importance > 0.5:
    print(f"\n   ⚠️  WARNING: One feature has {max_importance*100:.1f}% importance!")
    print("      This might indicate data leakage. Review your features.")
else:
    print(f"\n   ✅ Good! No single feature dominates (max: {max_importance*100:.1f}%)")

# ============================================================================
# STEP 8: SAVE MODEL
# ============================================================================

print("\n💾 STEP 8: Saving model...")

model_path = 'random_forest_model.pkl'

# Save model with metadata
model_metadata = {
    'model': model,
    'feature_columns': feature_columns,
    'training_date': datetime.now().isoformat(),
    'n_samples': len(X),
    'test_mae': test_mae,
    'test_rmse': test_rmse,
    'test_r2': test_r2,
    'cv_mae': cv_mae
}

with open(model_path, 'wb') as f:
    pickle.dump(model_metadata, f)

print(f"   ✓ Model saved to: {model_path}")
print(f"   ✓ File size: {os.path.getsize(model_path) / 1024:.2f} KB")

# ============================================================================
# STEP 9: TEST PREDICTION
# ============================================================================

print("\n🧪 STEP 9: Testing prediction...")

# Test with sample data
test_sample = X_test.iloc[0:1]
test_actual = y_test.iloc[0]
test_pred = model.predict(test_sample)[0]

print(f"\n   Sample prediction:")
print(f"      Predicted: {test_pred:.2f} kWh")
print(f"      Actual:    {test_actual:.2f} kWh")
print(f"      Error:     {abs(test_pred - test_actual):.2f} kWh")

# ============================================================================
# COMPLETE!
# ============================================================================

print("\n" + "=" * 70)
print("✅ MODEL TRAINING COMPLETE!")
print("=" * 70)
print("\n📝 NEXT STEPS:")
print("   1. Model is saved as: random_forest_model.pkl")
print("   2. Start backend: cd backend && python app.py")
print("   3. Backend will automatically load your model")
print("   4. Make predictions - NO MORE DEMO MODE!")
print("\n💡 TO USE YOUR OWN DATA:")
print("   1. Replace generate_training_data() with:")
print("      df = pd.read_csv('your_data.csv')")
print("   2. Ensure you have columns: timestamp, temperature, humidity,")
print("      occupancy, renewable, hvac_status, lighting_status, consumption")
print("   3. Re-run this script: python train_model.py")
print("=" * 70)
print("\n🎉 Your SmartEnergy platform now has a REAL AI model!")
print("=" * 70)

# Import os for file size
import os
