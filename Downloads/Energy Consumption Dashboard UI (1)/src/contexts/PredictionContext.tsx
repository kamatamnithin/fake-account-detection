import { createContext, useContext, useState, ReactNode } from 'react';

interface PredictionData {
  currentPrediction: number | null;
  predictionBounds: { lower: number; upper: number; confidence: number } | null;
  timestamp: Date | null;
  features: {
    temperature?: number;
    humidity?: number;
    occupancy?: number;
    renewable?: number;
  };
  historicalData: Array<{ timestamp: string; consumption: number }>;
}

interface PredictionContextType {
  predictionData: PredictionData;
  updatePrediction: (data: Partial<PredictionData>) => void;
  getPredictionContext: () => string;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [predictionData, setPredictionData] = useState<PredictionData>({
    currentPrediction: null,
    predictionBounds: null,
    timestamp: null,
    features: {},
    historicalData: [],
  });

  const updatePrediction = (data: Partial<PredictionData>) => {
    setPredictionData((prev) => ({ ...prev, ...data }));
  };

  const getPredictionContext = (): string => {
    const { currentPrediction, predictionBounds, features } = predictionData;
    
    if (!currentPrediction) {
      return `The user is viewing an energy consumption forecasting dashboard with the following metrics:
- Current consumption: 2,847 kWh
- Peak consumption time: 6-9 PM
- Forecast accuracy: 94.2%
- 3 anomalies detected in the past week
- Average savings: 24.3%`;
    }

    const confidence = predictionBounds?.confidence || 0.85;
    const confidencePercent = (confidence * 100).toFixed(1);
    
    let contextString = `The user just received an energy prediction with the following details:

**CURRENT PREDICTION:**
- Predicted consumption: ${currentPrediction.toFixed(2)} kWh
- Confidence level: ${confidencePercent}%`;

    if (predictionBounds) {
      contextString += `
- Lower bound: ${predictionBounds.lower.toFixed(2)} kWh
- Upper bound: ${predictionBounds.upper.toFixed(2)} kWh`;
    }

    if (Object.keys(features).length > 0) {
      contextString += `\n\n**ENVIRONMENTAL CONDITIONS:**`;
      if (features.temperature) contextString += `\n- Temperature: ${features.temperature}°C`;
      if (features.humidity) contextString += `\n- Humidity: ${features.humidity}%`;
      if (features.occupancy) contextString += `\n- Occupancy: ${features.occupancy} people`;
      if (features.renewable) contextString += `\n- Renewable energy: ${features.renewable}%`;
    }

    contextString += `\n\n**YOUR TASK:**
Based on this prediction, provide:
1. **Analysis** - What does this prediction mean?
2. **Actionable Tips** - 3-5 specific ways to reduce consumption
3. **Cost Savings** - Estimate potential savings
4. **Timing** - Best times to use high-energy appliances
5. **Optimization** - How to improve based on current conditions

Keep your response concise, actionable, and focused on energy savings.`;

    return contextString;
  };

  return (
    <PredictionContext.Provider value={{ predictionData, updatePrediction, getPredictionContext }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
}
