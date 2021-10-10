import { Document, ObjectId } from "mongodb";
import { DI } from "../../di";
import { removeMessageByGroupId } from "../message/logic";
import { Group, GroupId, NewGroup } from "./types";

const mapDocumentToGroup = (document: Document): Group => ({
    id: document._id,
    title: document.title,
});

const mapNewGroupToDocument = (newGroup: NewGroup): Document => ({
    title: newGroup.title,
});

export const getGroups = async (di: DI) => {
    const documents = await di.mongo.db().collection("group").find().toArray();
    return documents.map<Group>(mapDocumentToGroup);
};

export const addGroup = async (di: DI, newGroup: NewGroup) => {
    const newDocument = mapNewGroupToDocument(newGroup);
    const result = await di.mongo
        .db()
        .collection("group")
        .insertOne(newDocument);

    return result.insertedId;
};

export const removeGroup = async (di: DI, id: GroupId) => {
    await removeMessageByGroupId(di, id);
    await di.mongo
        .db()
        .collection("group")
        .deleteOne({ _id: new ObjectId(id) });
};
