import "./setup/setupIcons";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { unregister as unregisterServiceWorker } from "./services/serviceWorker";
import { getRootElement } from "./dom";
import { runWebSocket } from "./services/webApi";

render(
    <StrictMode>
        <App />
    </StrictMode>,
    getRootElement()
);

runWebSocket(`ws://localhost:3001`);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregisterServiceWorker();
