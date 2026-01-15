// Mock data for Energy Consumption Forecasting Dashboard
// Realistic data with proper patterns and current timestamps

export interface EnergyDataPoint {
  timestamp: string;
  actual: number;
  forecast?: number;
  upperBound?: number;
  lowerBound?: number;
}

export interface TemperatureDataPoint {
  timestamp: string;
  temperature: number;
}

export interface OccupancyDataPoint {
  timestamp: string;
  occupancy: number;
}

export interface RenewableDataPoint {
  timestamp: string;
  solar: number;
  wind: number;
}

export interface Anomaly {
  id: string;
  timestamp: string;
  value: number;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

// Generate timestamps for the last 7 days and next 24 hours
const generateTimestamps = (days: number, future: number = 0) => {
  const timestamps: string[] = [];
  const now = new Date();
  
  for (let i = days * 24; i >= -future; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000);
    timestamps.push(date.toISOString());
  }
  
  return timestamps;
};

// Generate realistic energy consumption data
const generateEnergyData = (): EnergyDataPoint[] => {
  const timestamps = generateTimestamps(7, 24);
  
  return timestamps.map((timestamp, index) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const isFuture = index > 7 * 24;
    
    // More realistic base consumption with time-of-day pattern
    let base = 150;
    if (hour >= 6 && hour < 9) base = 285; // Morning peak
    else if (hour >= 9 && hour < 12) base = 245; // Mid-morning
    else if (hour >= 12 && hour < 14) base = 265; // Lunch peak
    else if (hour >= 14 && hour < 17) base = 235; // Afternoon
    else if (hour >= 17 && hour < 20) base = 325; // Evening peak (highest)
    else if (hour >= 20 && hour < 23) base = 255; // Late evening
    else base = 115; // Night (lowest)
    
    // Add weekly pattern and realistic variation
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.75 : 1;
    const variation = (Math.random() - 0.5) * 35; // More realistic variation
    
    const actualValue = base * weekendFactor + variation;
    const forecastValue = base * weekendFactor + (Math.random() - 0.5) * 25;
    
    return {
      timestamp,
      actual: isFuture ? undefined : Math.max(50, actualValue),
      forecast: isFuture ? Math.max(50, forecastValue) : undefined,
      upperBound: isFuture ? Math.max(60, forecastValue * 1.12) : undefined,
      lowerBound: isFuture ? Math.max(40, forecastValue * 0.88) : undefined,
    };
  });
};

// Generate temperature data
const generateTemperatureData = (): TemperatureDataPoint[] => {
  const timestamps = generateTimestamps(7);
  
  return timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    
    // More realistic temperature curve
    let temp = 20;
    if (hour >= 0 && hour < 6) temp = 14 + hour * 0.3;
    else if (hour >= 6 && hour < 14) temp = 16 + (hour - 6) * 1.8;
    else if (hour >= 14 && hour < 20) temp = 30 - (hour - 14) * 2;
    else temp = 22 - (hour - 20) * 1.5;
    
    return {
      timestamp,
      temperature: temp + (Math.random() - 0.5) * 4,
    };
  });
};

// Generate occupancy data
const generateOccupancyData = (): OccupancyDataPoint[] => {
  const timestamps = generateTimestamps(7);
  
  return timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    
    let occupancy = 0;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Weekday - more realistic office pattern
      if (hour >= 8 && hour < 9) occupancy = 45 + Math.random() * 20; // Arriving
      else if (hour >= 9 && hour < 12) occupancy = 75 + Math.random() * 20; // Morning work
      else if (hour >= 12 && hour < 14) occupancy = 55 + Math.random() * 15; // Lunch
      else if (hour >= 14 && hour < 17) occupancy = 80 + Math.random() * 15; // Afternoon work
      else if (hour >= 17 && hour < 19) occupancy = 35 + Math.random() * 20; // Leaving
      else occupancy = 5 + Math.random() * 10; // Night/early morning
    } else {
      // Weekend - minimal activity
      if (hour >= 10 && hour < 16) occupancy = 15 + Math.random() * 20;
      else occupancy = 5 + Math.random() * 10;
    }
    
    return {
      timestamp,
      occupancy: Math.max(0, Math.min(100, occupancy)),
    };
  });
};

// Generate renewable energy data
const generateRenewableData = (): RenewableDataPoint[] => {
  const timestamps = generateTimestamps(7);
  
  return timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    
    // Solar peaks during day, wind is more random
    let solar = 0;
    if (hour >= 6 && hour < 18) {
      solar = Math.max(0, 50 * Math.sin(((hour - 6) / 12) * Math.PI) + Math.random() * 20);
    }
    
    const wind = 30 + Math.random() * 40;
    
    return {
      timestamp,
      solar,
      wind,
    };
  });
};

// Generate realistic anomalies with recent timestamps
const generateAnomalies = (): Anomaly[] => {
  const now = Date.now();
  return [
    {
      id: '1',
      timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      value: 428,
      severity: 'high',
      description: 'Critical spike detected: 37% above predicted baseline - possible HVAC malfunction',
    },
    {
      id: '2',
      timestamp: new Date(now - 14 * 60 * 60 * 1000).toISOString(),
      value: 392,
      severity: 'medium',
      description: 'Evening peak exceeded threshold - recommend load balancing review',
    },
    {
      id: '3',
      timestamp: new Date(now - 38 * 60 * 60 * 1000).toISOString(),
      value: 348,
      severity: 'low',
      description: 'Minor deviation from predicted pattern - within acceptable variance',
    },
  ];
};

export const mockData = {
  energy: generateEnergyData(),
  temperature: generateTemperatureData(),
  occupancy: generateOccupancyData(),
  renewable: generateRenewableData(),
  anomalies: generateAnomalies(),
  
  kpis: {
    currentConsumption: 287,
    forecast24h: 6845,
    peakDemand: 342,
    renewableShare: 28.7,
    detectedAnomalies: 3,
  },
  
  models: {
    arima: {
      status: 'active',
      accuracy: 94.3,
      mae: 12.1,
      rmse: 18.4,
      lastTrained: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
    },
    ml: {
      status: 'active',
      accuracy: 96.8,
      mae: 8.7,
      rmse: 13.1,
      lastTrained: new Date(Date.now() - 2.8 * 60 * 60 * 1000).toISOString(),
    },
  },
};