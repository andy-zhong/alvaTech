import { initApp } from "./app/bootstrap.js";

initApp().catch((err) => {
  console.error("[main] App failed to initialize:", err);
});