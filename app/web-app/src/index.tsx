import "./setupIcons";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { getRootElement } from "./dom";

render(
    <StrictMode>
        <App />
    </StrictMode>,
    getRootElement()
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
