import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// ==================== AUTH ROUTES ====================

// Sign up new user
app.post("/make-server-9cc3504b/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log(`Authorization error while signing up user: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Server error in signup: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== VIOLATIONS ROUTES ====================

// Get all violations
app.get("/make-server-9cc3504b/violations", async (c) => {
  try {
    const violations = await kv.getByPrefix("violation:");
    return c.json({ success: true, data: violations });
  } catch (error) {
    console.log(`Error fetching violations: ${error}`);
    return c.json({ error: "Failed to fetch violations" }, 500);
  }
});

// Create new violation
app.post("/make-server-9cc3504b/violations", async (c) => {
  try {
    const violation = await c.req.json();
    const id = `violation:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(id, {
      ...violation,
      id,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, id });
  } catch (error) {
    console.log(`Error creating violation: ${error}`);
    return c.json({ error: "Failed to create violation" }, 500);
  }
});

// Update violation status
app.patch("/make-server-9cc3504b/violations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const existing = await kv.get(`violation:${id}`);
    if (!existing) {
      return c.json({ error: "Violation not found" }, 404);
    }

    await kv.set(`violation:${id}`, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error updating violation: ${error}`);
    return c.json({ error: "Failed to update violation" }, 500);
  }
});

// ==================== VEHICLE DETECTION ROUTES ====================

// Log vehicle detection
app.post("/make-server-9cc3504b/detections", async (c) => {
  try {
    const detection = await c.req.json();
    const id = `detection:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(id, {
      ...detection,
      id,
      timestamp: new Date().toISOString(),
    });

    return c.json({ success: true, id });
  } catch (error) {
    console.log(`Error logging detection: ${error}`);
    return c.json({ error: "Failed to log detection" }, 500);
  }
});

// Get recent detections
app.get("/make-server-9cc3504b/detections/recent", async (c) => {
  try {
    const limit = parseInt(c.req.query("limit") || "50");
    const allDetections = await kv.getByPrefix("detection:");
    
    // Sort by timestamp and limit
    const recentDetections = allDetections
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return c.json({ success: true, data: recentDetections });
  } catch (error) {
    console.log(`Error fetching recent detections: ${error}`);
    return c.json({ error: "Failed to fetch detections" }, 500);
  }
});

// ==================== VEHICLE SEARCH ROUTES ====================

// Search vehicle by plate number
app.get("/make-server-9cc3504b/vehicles/search", async (c) => {
  try {
    const plate = c.req.query("plate");
    if (!plate) {
      return c.json({ error: "Plate number is required" }, 400);
    }

    // Search in detections
    const detections = await kv.getByPrefix("detection:");
    const vehicleDetections = detections.filter(d => 
      d.plate && d.plate.toLowerCase().includes(plate.toLowerCase())
    );

    // Search in violations
    const violations = await kv.getByPrefix("violation:");
    const vehicleViolations = violations.filter(v => 
      v.plate && v.plate.toLowerCase().includes(plate.toLowerCase())
    );

    return c.json({
      success: true,
      data: {
        plate,
        detections: vehicleDetections,
        violations: vehicleViolations,
        totalDetections: vehicleDetections.length,
        totalViolations: vehicleViolations.length,
      },
    });
  } catch (error) {
    console.log(`Error searching vehicle: ${error}`);
    return c.json({ error: "Failed to search vehicle" }, 500);
  }
});

// ==================== ANALYTICS ROUTES ====================

// Get dashboard statistics
app.get("/make-server-9cc3504b/analytics/stats", async (c) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allDetections = await kv.getByPrefix("detection:");
    const allViolations = await kv.getByPrefix("violation:");

    // Today's detections
    const todayDetections = allDetections.filter(d => 
      new Date(d.timestamp) >= today
    );

    // Active violations (pending)
    const activeViolations = allViolations.filter(v => 
      v.status === "Pending"
    );

    // Calculate traffic density (mock calculation)
    const trafficDensity = Math.min(100, Math.round((todayDetections.length / 100) * 68));

    return c.json({
      success: true,
      data: {
        totalVehiclesToday: todayDetections.length,
        activeViolations: activeViolations.length,
        trafficDensity,
        totalDetections: allDetections.length,
        totalViolations: allViolations.length,
      },
    });
  } catch (error) {
    console.log(`Error fetching analytics stats: ${error}`);
    return c.json({ error: "Failed to fetch statistics" }, 500);
  }
});

// Get hourly vehicle count
app.get("/make-server-9cc3504b/analytics/hourly", async (c) => {
  try {
    const allDetections = await kv.getByPrefix("detection:");
    
    // Group by hour
    const hourlyData: Record<number, number> = {};
    allDetections.forEach(d => {
      const hour = new Date(d.timestamp).getHours();
      hourlyData[hour] = (hourlyData[hour] || 0) + 1;
    });

    const result = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourlyData[hour] || 0,
    }));

    return c.json({ success: true, data: result });
  } catch (error) {
    console.log(`Error fetching hourly data: ${error}`);
    return c.json({ error: "Failed to fetch hourly data" }, 500);
  }
});

// ==================== CAMERA STATUS ROUTES ====================

// Get camera status
app.get("/make-server-9cc3504b/cameras/status", async (c) => {
  try {
    const cameras = await kv.getByPrefix("camera:");
    return c.json({ success: true, data: cameras });
  } catch (error) {
    console.log(`Error fetching camera status: ${error}`);
    return c.json({ error: "Failed to fetch camera status" }, 500);
  }
});

// Update camera status
app.patch("/make-server-9cc3504b/cameras/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const existing = await kv.get(`camera:${id}`);
    const cameraData = {
      ...(existing || {}),
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`camera:${id}`, cameraData);

    return c.json({ success: true, data: cameraData });
  } catch (error) {
    console.log(`Error updating camera status: ${error}`);
    return c.json({ error: "Failed to update camera status" }, 500);
  }
});

// Health check
app.get("/make-server-9cc3504b/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
