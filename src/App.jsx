import React, { useEffect } from "react";
import Routes from "./Routes";
import { analyticsService } from "./services/analytics";
import { adSenseService } from "./services/adsense";

function App() {
  useEffect(() => {
    // Initialize analytics and AdSense on app startup
    analyticsService.init();
    adSenseService.init();
  }, []);

  return (
    <Routes />
  );
}

export default App;
