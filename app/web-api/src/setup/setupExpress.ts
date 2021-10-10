import express from "express";
import { DI } from "../di";

export const setupExpress = (di: DI) => {
    const app = express();
    app.use(express.json());
    
    di.setExpress(app);
};
