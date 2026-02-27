import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9cc3504b`;

// Check if backend is configured
const isBackendConfigured = projectId && publicAnonKey && 
  projectId !== 'your-project-id' && 
  publicAnonKey !== 'your-anon-key';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // If backend is not configured, throw error immediately
  if (!isBackendConfigured) {
    throw new Error('Backend not configured');
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "API request failed");
    }

    return data.data;
  } catch (error) {
    // Silently fail for backend unavailable - app will use mock data
    throw error;
  }
}

// ==================== AUTH API ====================

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export const authApi = {
  signUp: (data: SignUpData) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ==================== VIOLATIONS API ====================

export interface Violation {
  id?: string;
  plate: string;
  type: string;
  location: string;
  camera: string;
  date: string;
  time: string;
  speed?: string;
  limit?: string;
  fine: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export const violationsApi = {
  getAll: () => apiCall<Violation[]>("/violations"),
  
  create: (violation: Omit<Violation, "id" | "createdAt">) =>
    apiCall("/violations", {
      method: "POST",
      body: JSON.stringify(violation),
    }),
  
  updateStatus: (id: string, updates: Partial<Violation>) =>
    apiCall(`/violations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
};

// ==================== VEHICLE DETECTION API ====================

export interface VehicleDetection {
  id?: string;
  plate: string;
  confidence: number;
  type: string;
  violation: string | null;
  timestamp: string;
  camera?: string;
  location?: string;
}

export const detectionsApi = {
  log: (detection: Omit<VehicleDetection, "id" | "timestamp">) =>
    apiCall("/detections", {
      method: "POST",
      body: JSON.stringify(detection),
    }),
  
  getRecent: (limit: number = 50) =>
    apiCall<VehicleDetection[]>(`/detections/recent?limit=${limit}`),
};

// ==================== VEHICLE SEARCH API ====================

export interface VehicleSearchResult {
  plate: string;
  detections: VehicleDetection[];
  violations: Violation[];
  totalDetections: number;
  totalViolations: number;
}

export const vehicleApi = {
  search: (plate: string) =>
    apiCall<VehicleSearchResult>(`/vehicles/search?plate=${encodeURIComponent(plate)}`),
};

// ==================== ANALYTICS API ====================

export interface DashboardStats {
  totalVehiclesToday: number;
  activeViolations: number;
  trafficDensity: number;
  totalDetections: number;
  totalViolations: number;
}

export interface HourlyData {
  hour: number;
  count: number;
}

export const analyticsApi = {
  getStats: () => apiCall<DashboardStats>("/analytics/stats"),
  
  getHourlyData: () => apiCall<HourlyData[]>("/analytics/hourly"),
};

// ==================== CAMERA API ====================

export interface Camera {
  id: string;
  name: string;
  status: string;
  location?: string;
  updatedAt?: string;
}

export const cameraApi = {
  getStatus: () => apiCall<Camera[]>("/cameras/status"),
  
  updateStatus: (id: string, updates: Partial<Camera>) =>
    apiCall(`/cameras/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
};

// ==================== HEALTH CHECK ====================

export const healthCheck = () =>
  apiCall<{ status: string; timestamp: string }>("/health");