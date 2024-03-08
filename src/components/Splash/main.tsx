import React from "react";
import ReactDOM from "react-dom/client";
import SplashScreen from "./SplashScreen";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <SplashScreen />
    </React.StrictMode>
);
