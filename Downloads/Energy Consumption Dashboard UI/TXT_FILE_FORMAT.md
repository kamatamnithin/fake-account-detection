# 📄 TXT File Upload Format for Energy Prediction

## ✅ How to Use TXT Files

Upload a `.txt` file with your energy parameters, and the system will:
1. **Auto-fill** the prediction form
2. **Automatically predict** energy consumption
3. Give you instant results!

## 📋 File Format

Each line should be in the format: `key: value` or `key = value`

### Example TXT File:

```txt
temperature: 24.3
humidity: 62.5
occupancy: 1800
renewable: 55
hvac: On
lighting: On
day: Monday
holiday: Not a Holiday
```

## 🔑 Supported Keys

| Key | Aliases | Example Value | Description |
|-----|---------|---------------|-------------|
| `temperature` | `temp` | `24.3` | Temperature in °C |
| `humidity` | - | `62.5` | Humidity in % |
| `occupancy` | - | `1800` | Number of people |
| `renewable` | `renewableenergy` | `55` | Renewable energy % |
| `hvac` | - | `On` or `Off` | HVAC status |
| `lighting` | - | `On` or `Off` | Lighting status |
| `day` | `dayofweek` | `Monday` | Day of the week |
| `holiday` | - | `Holiday` or `Not a Holiday` | Holiday status |

## 📝 Example Files

### Example 1: High Energy Usage
```txt
temperature: 32.5
humidity: 75.0
occupancy: 2500
renewable: 30
hvac: On
lighting: On
day: Friday
holiday: Not a Holiday
```

### Example 2: Low Energy Usage
```txt
temperature: 18.0
humidity: 45.0
occupancy: 800
renewable: 80
hvac: Off
lighting: Off
day: Sunday
holiday: Holiday
```

### Example 3: Using `=` separator
```txt
temp = 26.0
humidity = 60.0
occupancy = 1500
renewableenergy = 60
hvac = On
lighting = On
dayofweek = Wednesday
holiday = Not a Holiday
```

## 🎯 What Happens After Upload?

1. **File is parsed** - System reads your parameters
2. **Form is auto-filled** - All fields populated automatically
3. **Prediction runs** - Energy forecast generated instantly
4. **Results displayed** - See your consumption prediction
5. **AI Chat ready** - Ask for tips based on your prediction

## ✨ Features

- ✅ **Auto-fill** - No manual data entry needed
- ✅ **Auto-predict** - Instant forecasting
- ✅ **Flexible format** - Use `:` or `=` separators
- ✅ **Case-insensitive** - Keys work in any case
- ✅ **Multiple aliases** - Different key names supported

## 💡 Tips

1. **Keep it simple** - One parameter per line
2. **Use correct format** - `key: value` or `key = value`
3. **Match values** - Use exact values like `On`/`Off`, `Monday`, etc.
4. **Save as .txt** - Make sure file extension is `.txt`
5. **Test with examples** - Try the example files above

## 🚀 Quick Start

1. Create a new file called `energy_data.txt`
2. Copy one of the examples above
3. Save the file
4. Go to **Prediction** page
5. Upload your `.txt` file
6. Watch it auto-fill and predict!

## 🎉 Benefits

- **Save time** - No manual typing
- **Batch processing** - Upload multiple scenarios
- **Reusable** - Save templates for different situations
- **Shareable** - Send to team members
- **Version control** - Track changes over time

---

**Ready to try it? Create your TXT file and upload it now!** 📤
