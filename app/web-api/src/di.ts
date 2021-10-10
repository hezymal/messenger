import { Express } from "express";
import { MongoClient } from "mongodb";

export interface DI {
    setExpress: (express: Express) => void;
    setMongo: (mongo: MongoClient) => void;
    express: Express;
    mongo: MongoClient;
}

export const createDI = (): DI => {
    let storedExpress: Express | null = null;
    let storedMongo: MongoClient | null = null;

    return {
        setExpress: (express: Express) => {
            storedExpress = express;
        },

        setMongo: (mongo: MongoClient) => {
            storedMongo = mongo;
        },

        get express() {
            if (!storedExpress) {
                throw new Error('Express is not set');
            }

            return storedExpress;
        },

        get mongo() {
            if (!storedMongo) {
                throw new Error('Mongo is not set');
            }

            return storedMongo;
        },
    };
};
