import re
from pathlib import Path
import pandas as pd

p = Path('data/my_history.csv')
if not p.exists():
    print('No file')
    raise SystemExit(1)
text = p.read_text(encoding='utf-8')
# Find timestamps
pattern = re.compile(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}')
matches = list(pattern.finditer(text))
if not matches:
    print('No timestamp pattern found - abort')
    raise SystemExit(1)
rows = []
for i,m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(text)
    row = text[start:end]
    # collapse whitespace/newlines
    row = row.replace('\n',' ').replace('\r',' ')
    row = row.strip()
    rows.append(row)
# Now build dataframe by splitting on commas; but values might contain commas - assume simple split
split_rows = [r.split(',') for r in rows]
# Determine expected columns manually
cols = ['Timestamp','Temperature','Humidity','SquareFootage','Occupancy','HVACUsage','LightingUsage','RenewableEnergy','DayOfWeek','Holiday','EnergyConsumption']
# Some rows might include extra columns; we keep only first len(cols) entries
norm_rows = []
for r in split_rows:
    if len(r) >= len(cols):
        norm_rows.append(r[:len(cols)])
    else:
        # pad with empty
        norm_rows.append(r + ['']*(len(cols)-len(r)))

df = pd.DataFrame(norm_rows, columns=cols)
# Clean and convert
# Timestamp
df['Timestamp'] = pd.to_datetime(df['Timestamp'], errors='coerce')
# numeric conversions
for c in ['Temperature','Humidity','SquareFootage','Occupancy','RenewableEnergy','EnergyConsumption']:
    df[c] = pd.to_numeric(df[c], errors='coerce')
# HVAC and Lighting: On/Off -> 1/0
df['HVACUsage'] = df['HVACUsage'].str.strip().str.lower().map({'on':1,'off':0})
df['LightingUsage'] = df['LightingUsage'].str.strip().str.lower().map({'on':1,'off':0})
# DayOfWeek -> weekday number if it's name
week_map = {'monday':0,'tuesday':1,'wednesday':2,'thursday':3,'friday':4,'saturday':5,'sunday':6}

df['DayOfWeekNum'] = df['DayOfWeek'].str.strip().str.lower().map(week_map)
# Holiday -> is_holiday
df['is_holiday'] = df['Holiday'].str.strip().str.lower().map({'yes':1,'no':0})
# Derive features
df['hour'] = df['Timestamp'].dt.hour
df['day_of_week'] = df['Timestamp'].dt.weekday
df['month'] = df['Timestamp'].dt.month
df['day_of_month'] = df['Timestamp'].dt.day

df['is_weekend'] = df['day_of_week'].apply(lambda x: 1 if x>=5 else 0)
df['is_business_hour'] = df['hour'].apply(lambda h: 1 if 8<=h<=18 else 0)
# Map columns to training names
out = pd.DataFrame()
out['timestamp'] = df['Timestamp']
out['temperature'] = df['Temperature']
out['humidity'] = df['Humidity']
out['occupancy'] = df['Occupancy']
out['renewable'] = df['RenewableEnergy']
out['hvac_status'] = df['HVACUsage'].fillna(0).astype(int)
out['lighting_status'] = df['LightingUsage'].fillna(0).astype(int)
out['hour'] = df['hour']
out['day_of_week'] = df['day_of_week']
out['month'] = df['month']
out['day_of_month'] = df['day_of_month']
out['is_weekend'] = df['is_weekend']
out['is_business_hour'] = df['is_business_hour']
out['consumption'] = df['EnergyConsumption']
# Drop rows with missing timestamp or consumption
out = out.dropna(subset=['timestamp','consumption'])
# Save cleaned csv
out_path = p.with_name('my_history_clean.csv')
out.to_csv(out_path, index=False)
print(f'✅ Preprocessed {len(out)} rows -> {out_path}')
