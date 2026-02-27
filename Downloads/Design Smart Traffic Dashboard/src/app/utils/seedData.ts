import { violationsApi, detectionsApi, cameraApi } from "../services/api";

// Sample violations data
const sampleViolations = [
  {
    plate: "ABC 1234",
    type: "Speeding",
    location: "Highway 101, KM 45",
    camera: "CAM-101-N",
    date: "Feb 26, 2026",
    time: "10:24 AM",
    speed: "95 km/h",
    limit: "60 km/h",
    fine: "$150",
    status: "Pending",
  },
  {
    plate: "XYZ 5678",
    type: "Red Light",
    location: "Main St & 5th Ave",
    camera: "CAM-05-INT",
    date: "Feb 26, 2026",
    time: "10:18 AM",
    speed: "—",
    limit: "—",
    fine: "$200",
    status: "Pending",
  },
  {
    plate: "DEF 9012",
    type: "Wrong Lane",
    location: "Central Blvd",
    camera: "CAM-CB-12",
    date: "Feb 26, 2026",
    time: "10:12 AM",
    speed: "—",
    limit: "—",
    fine: "$100",
    status: "Paid",
  },
  {
    plate: "GHI 3456",
    type: "No Helmet",
    location: "Park Road",
    camera: "CAM-PR-08",
    date: "Feb 26, 2026",
    time: "10:05 AM",
    speed: "—",
    limit: "—",
    fine: "$75",
    status: "Pending",
  },
  {
    plate: "JKL 7890",
    type: "Speeding",
    location: "Highway 202, KM 23",
    camera: "CAM-202-S",
    date: "Feb 26, 2026",
    time: "09:58 AM",
    speed: "88 km/h",
    limit: "60 km/h",
    fine: "$150",
    status: "Paid",
  },
];

// Sample detection data
const sampleDetections = [
  {
    plate: "ABC 1234",
    confidence: 98.5,
    type: "Car",
    violation: null,
    camera: "CAM-101-N",
    location: "Highway 101, KM 45",
  },
  {
    plate: "XYZ 5678",
    confidence: 96.2,
    type: "Bike",
    violation: "No Helmet",
    camera: "CAM-PR-08",
    location: "Park Road",
  },
  {
    plate: "DEF 9012",
    confidence: 99.1,
    type: "Car",
    violation: null,
    camera: "CAM-CB-12",
    location: "Central Blvd",
  },
  {
    plate: "GHI 3456",
    confidence: 94.7,
    type: "Truck",
    violation: null,
    camera: "CAM-05-INT",
    location: "Main St & 5th Ave",
  },
  {
    plate: "JKL 7890",
    confidence: 97.8,
    type: "Car",
    violation: "Speeding",
    camera: "CAM-202-S",
    location: "Highway 202, KM 23",
  },
  {
    plate: "MNO 1122",
    confidence: 95.3,
    type: "Bus",
    violation: null,
    camera: "CAM-101-N",
    location: "Highway 101, KM 45",
  },
  {
    plate: "PQR 3344",
    confidence: 98.9,
    type: "Bike",
    violation: null,
    camera: "CAM-CB-12",
    location: "Central Blvd",
  },
  {
    plate: "STU 5566",
    confidence: 93.2,
    type: "Car",
    violation: "Red Light",
    camera: "CAM-05-INT",
    location: "Main St & 5th Ave",
  },
];

// Sample camera data
const sampleCameras = [
  {
    id: "CAM-101-N",
    name: "Highway 101 - North",
    status: "active",
    location: "Highway 101, KM 45",
  },
  {
    id: "CAM-05-INT",
    name: "Main St Intersection",
    status: "active",
    location: "Main St & 5th Ave",
  },
  {
    id: "CAM-CB-12",
    name: "Central Blvd",
    status: "active",
    location: "Central Blvd",
  },
  {
    id: "CAM-202-S",
    name: "Highway 202 - South",
    status: "active",
    location: "Highway 202, KM 23",
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Checking backend availability...");

    let successCount = 0;
    let failCount = 0;
    let backendAvailable = true;

    // Test backend availability with first violation
    try {
      await violationsApi.create(sampleViolations[0]);
      console.log(`✓ Backend connected - seeding data...`);
      successCount++;
    } catch (error) {
      // Backend not available - skip seeding silently
      backendAvailable = false;
      console.log("ℹ️ Backend not available. App will use local mock data.");
      return { success: true, successCount: 0, failCount: 0, backendAvailable: false };
    }

    // Continue seeding if backend is available
    for (let i = 1; i < sampleViolations.length; i++) {
      try {
        await violationsApi.create(sampleViolations[i]);
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    // Seed detections
    for (const detection of sampleDetections) {
      try {
        await detectionsApi.log(detection);
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    // Seed cameras
    for (const camera of sampleCameras) {
      try {
        await cameraApi.updateStatus(camera.id, camera);
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    console.log(
      `✅ Database seeding completed! Success: ${successCount}, Failed: ${failCount}`
    );

    return { success: true, successCount, failCount, backendAvailable: true };
  } catch (error) {
    console.log("ℹ️ Backend not configured. App will run with local mock data.");
    return { success: true, successCount: 0, failCount: 0, backendAvailable: false };
  }
}

// Auto-seed on first load (only if localStorage flag not set)
export function autoSeedIfNeeded() {
  const hasSeeded = localStorage.getItem("anpr_db_seeded");

  if (!hasSeeded) {
    seedDatabase().then((result) => {
      if (result.success) {
        localStorage.setItem("anpr_db_seeded", "true");
        console.log("✅ Initial database setup complete!");
      }
    });
  } else {
    console.log("ℹ️ Database already seeded. Skipping...");
  }
}