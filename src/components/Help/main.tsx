import React from "react";
import ReactDOM from "react-dom/client";

import Help from "./Help";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("help-root") as HTMLElement).render(
    <React.StrictMode>
        <Help />
    </React.StrictMode>
);
