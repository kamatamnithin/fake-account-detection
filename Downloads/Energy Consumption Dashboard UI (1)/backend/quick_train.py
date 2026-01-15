import pickle, os
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime

print('⚡ Quick train: creating small model (fast)')
# Small synthetic dataset
np.random.seed(42)
X = np.random.rand(500, 13)
y = X.sum(axis=1) + np.random.randn(500) * 0.1

model = RandomForestRegressor(n_estimators=20, random_state=42, n_jobs=-1)
model.fit(X, y)

model_metadata = {
    'model': model,
    'feature_columns': [f'f{i}' for i in range(X.shape[1])],
    'training_date': datetime.now().isoformat(),
    'n_samples': X.shape[0]
}

out_path = 'random_forest_model.pkl'
with open(out_path, 'wb') as f:
    pickle.dump(model_metadata, f)

print(f'✅ Quick model saved to {out_path} ({os.path.getsize(out_path)} bytes)')
