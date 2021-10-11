import express from "express";
import expressWS from "express-ws";
import { DI } from "../di";

export const setupExpress = (di: DI) => {
    const application = express();
    const websocket = expressWS(application);

    application.use(express.json());

    di.setExpress(application as unknown as expressWS.Application);
    di.setExpressWS(websocket);
};
