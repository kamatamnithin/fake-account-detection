import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { LiveMonitoring } from "./pages/LiveMonitoring";
import { Violations } from "./pages/Violations";
import { Analytics } from "./pages/Analytics";
import { VehicleSearch } from "./pages/VehicleSearch";
import { MapView } from "./pages/MapView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "live-monitoring", Component: LiveMonitoring },
      { path: "violations", Component: Violations },
      { path: "analytics", Component: Analytics },
      { path: "vehicle-search", Component: VehicleSearch },
      { path: "map-view", Component: MapView },
    ],
  },
]);
