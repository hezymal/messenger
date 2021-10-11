import {
    Instance as ExpressWS,
    Application as ExpressWithPlugins,
} from "express-ws";
import { MongoClient } from "mongodb";

export interface DI {
    setExpress: (express: ExpressWithPlugins) => void;
    setExpressWS: (expressWS: ExpressWS) => void;
    setMongo: (mongo: MongoClient) => void;

    express: ExpressWithPlugins;
    expressWS: ExpressWS;
    mongo: MongoClient;
}

export const createDI = (): DI => {
    let storedExpress: ExpressWithPlugins | null = null;
    let storedExpressWS: ExpressWS | null = null;
    let storedMongo: MongoClient | null = null;

    return {
        setExpress: (express: ExpressWithPlugins) => {
            storedExpress = express;
        },

        setExpressWS: (expressWS: ExpressWS) => {
            storedExpressWS = expressWS;
        },

        setMongo: (mongo: MongoClient) => {
            storedMongo = mongo;
        },

        get express() {
            if (!storedExpress) {
                throw new Error("Express is not set");
            }

            return storedExpress;
        },

        get expressWS() {
            if (!storedExpressWS) {
                throw new Error("ExpressWS is not set");
            }

            return storedExpressWS;
        },

        get mongo() {
            if (!storedMongo) {
                throw new Error("Mongo is not set");
            }

            return storedMongo;
        },
    };
};
