import { MongoClient } from "mongodb";
import { DI } from "../di";

export const setupMongo = async (di: DI) => {
    const client = await MongoClient.connect("mongodb://localhost:27017/");
    di.setMongo(client);
};
