/**
 * Prediction Service
 * Handles all API calls to the backend for energy predictions
 */

// Use environment variable for API URL, fallback to localhost with safe access
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'https://smart-energy-production-e366.up.railway.app/api';

console.log('🔌 Backend API URL:', API_BASE_URL);
console.log('🔍 import.meta:', typeof import.meta);
console.log('🔍 import.meta.env:', import.meta?.env);
console.log('🔍 VITE_API_URL:', import.meta?.env?.VITE_API_URL);

export interface PredictionFeature {
  timestamp: string;
  temperature?: number;
  occupancy?: number;
  renewable?: number;
  [key: string]: any;
}

export interface PredictionResult {
  predicted: number;
  lower_bound?: number;
  upper_bound?: number;
  timestamp?: string;
  index: number;
}

export interface ForecastResult {
  date: string;
  day_name: string;
  predicted: number;
  lower_bound: number;
  upper_bound: number;
  actual: number | null;
}

export interface ModelInfo {
  model_type: string;
  n_estimators?: number;
  max_depth?: number;
  n_features?: number;
  feature_names?: string[];
}

export interface ModelMetrics {
  mape: number;
  rmse: number;
  r2: number;
  mae: number;
  accuracy: number;
  last_updated: string;
}

class PredictionService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the backend API is healthy
   */
  async healthCheck(): Promise<{ status: string; model_loaded: boolean }> {
    console.log('🏥 Health check called, URL:', `${this.baseUrl}/health`);
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      console.log('🏥 Health check response status:', response.status);
      if (!response.ok) throw new Error('Health check failed');
      const data = await response.json();
      console.log('🏥 Health check data:', data);
      return data;
    } catch (error) {
      console.error('🏥 Health check error:', error);
      // Silently fail - backend not available is expected in some cases
      return { status: 'unhealthy', model_loaded: false };
    }
  }

  /**
   * Get information about the loaded model
   */
  async getModelInfo(): Promise<{
    success: boolean;
    model_loaded: boolean;
    model_info?: ModelInfo;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/model-info`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error('Failed to get model info');
      return await response.json();
    } catch (error) {
      // Silently fail - backend not available
      return { success: false, model_loaded: false };
    }
  }

  /**
   * Make predictions using the Random Forest model
   */
  async predict(
    features: PredictionFeature[],
    includeConfidence: boolean = true
  ): Promise<{
    success: boolean;
    predictions?: PredictionResult[];
    feature_importance?: Record<string, number>;
    model_type?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          features,
          include_confidence: includeConfidence,
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Prediction failed');
      }

      return await response.json();
    } catch (error) {
      // Silently fail - will use mock predictions
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate multi-day forecast
   */
  async forecast(
    days: number = 7,
    baseFeatures?: Partial<PredictionFeature>
  ): Promise<{
    success: boolean;
    forecast?: ForecastResult[];
    model_type?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/predict/forecast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          days,
          base_features: baseFeatures || {},
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Forecast failed');
      }

      return await response.json();
    } catch (error) {
      // Silently fail - will use mock data
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Upload CSV data file
   */
  async uploadData(
    file: File
  ): Promise<{
    success: boolean;
    message?: string;
    statistics?: any;
    error?: string;
  }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get model performance metrics
   */
  async getMetrics(): Promise<{
    success: boolean;
    metrics?: ModelMetrics;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics`);
      if (!response.ok) throw new Error('Failed to get metrics');
      return await response.json();
    } catch (error) {
      // Silently return failure - backend might not be available
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Export predictions to CSV
   */
  exportToCSV(predictions: PredictionResult[], filename?: string): void {
    const headers = ['Index', 'Timestamp', 'Predicted', 'Lower Bound', 'Upper Bound'];
    const rows = predictions.map((pred) => [
      pred.index,
      pred.timestamp || '',
      pred.predicted.toFixed(2),
      pred.lower_bound?.toFixed(2) || '',
      pred.upper_bound?.toFixed(2) || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      filename || `predictions_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Generate sample data for testing
   */
  generateSampleFeatures(count: number = 7): PredictionFeature[] {
    const features: PredictionFeature[] = [];
    const baseDate = new Date();

    for (let i = 0; i < count; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);

      features.push({
        timestamp: date.toISOString().replace('T', ' ').substring(0, 19),
        temperature: 20 + Math.random() * 5,
        occupancy: 40 + Math.random() * 20,
        renewable: 100 + Math.random() * 50,
      });
    }

    return features;
  }

  /**
   * Get current energy consumption prediction
   */
  async getCurrentConsumption(): Promise<{
    success: boolean;
    current_consumption?: number;
    timestamp?: string;
    bounds?: { lower_bound: number; upper_bound: number; confidence: number };
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/current`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error('Failed to get current consumption');
      return await response.json();
    } catch (error) {
      console.error('Current consumption error:', error);
      // Return fallback value
      return {
        success: false,
        error: 'Backend not available',
        current_consumption: 287.0
      };
    }
  }
}

// Export singleton instance
export const predictionService = new PredictionService();

// Export class for custom instances
export default PredictionService;