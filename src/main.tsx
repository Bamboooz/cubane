import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { defaultAppState } from "./const/state";
import { getAppState, setAppState, AppState } from "./state/appState";
import "./styles.css";

// load app state
window.onload = function() {
    Object.keys(defaultAppState).forEach((key) => {
        if (!getAppState(key as keyof AppState)) {
            setAppState(key as keyof AppState, defaultAppState[key as keyof AppState]);
        }
    });
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
