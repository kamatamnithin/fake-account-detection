import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { autoSeedIfNeeded } from "./utils/seedData";
import { BackendStatusBanner } from "./components/BackendStatusBanner";

export default function App() {
  useEffect(() => {
    // Auto-seed database on first load
    autoSeedIfNeeded();
  }, []);

  return (
    <>
      <BackendStatusBanner />
      <RouterProvider router={router} />
    </>
  );
}