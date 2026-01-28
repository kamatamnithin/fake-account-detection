import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix, classification_report
import pickle
import os

# Load dataset
print("Loading dataset...")
df = pd.read_csv("OldDataSet.csv")

print(f"Dataset shape: {df.shape}")
print(f"\nFirst few rows:")
print(df.head())
print(f"\nColumn names: {df.columns.tolist()}")
print(f"\nData types:\n{df.dtypes}")

# Display class distribution
print(f"\nClass distribution:")
print(df["Fake"].value_counts())
print(f"Fake accounts: {(df['Fake'] == 1).sum()}")
print(f"Real accounts: {(df['Fake'] == 0).sum()}")

# Prepare features and target
X = df.drop('Fake', axis=1)
y = df['Fake']

print(f"\nFeatures: {X.columns.tolist()}")
print(f"Number of features: {X.shape[1]}")

# Handle missing values
X = X.fillna(0)

# Split into train and test sets (80/20 split with stratification)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTrain set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")
print(f"Train - Fake: {(y_train == 1).sum()}, Real: {(y_train == 0).sum()}")
print(f"Test - Fake: {(y_test == 1).sum()}, Real: {(y_test == 0).sum()}")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Random Forest Classifier
print("\nTraining Random Forest Classifier...")
clf = RandomForestClassifier(
    n_estimators=100,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
    verbose=1
)
clf.fit(X_train_scaled, y_train)

# Make predictions
y_pred = clf.predict(X_test_scaled)
y_pred_proba = clf.predict_proba(X_test_scaled)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)

print(f"\n{'='*60}")
print(f"MODEL EVALUATION RESULTS")
print(f"{'='*60}")
print(f"Accuracy:  {accuracy*100:.2f}%")
print(f"Precision: {precision*100:.2f}%")
print(f"Recall:    {recall*100:.2f}%")
print(f"\nConfusion Matrix:")
print(f"TN: {cm[0,0]}, FP: {cm[0,1]}")
print(f"FN: {cm[1,0]}, TP: {cm[1,1]}")
print(f"\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Real (0)', 'Fake (1)']))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': clf.feature_importances_
}).sort_values('importance', ascending=False)

print(f"\nTop 10 Most Important Features:")
print(feature_importance.head(10).to_string(index=False))

# Save models
print(f"\nSaving models to pickle files...")
with open('classifier_model.pkl', 'wb') as f:
    pickle.dump(clf, f)
print("✓ classifier_model.pkl saved")

with open('scaler_model.pkl', 'wb') as f:
    pickle.dump(scaler, f)
print("✓ scaler_model.pkl saved")

# Save feature names
with open('feature_names.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)
print("✓ feature_names.pkl saved")

print(f"\n{'='*60}")
print(f"Training complete! Models saved successfully.")
print(f"{'='*60}")
