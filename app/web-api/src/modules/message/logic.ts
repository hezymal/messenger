import { Document } from "mongodb";
import { DI } from "../../di";
import { GroupId } from "../group/types";
import { Message, NewMessage } from "./types";

const mapDocumentToMessage = (document: Document): Message => ({
    id: document._id,
    text: document.text,
    owner: document.owner,
    groupId: document.groupId,
});

const mapNewMessageToDocument = (newMessage: NewMessage): Document => ({
    text: newMessage.text,
    owner: newMessage.owner,
    groupId: newMessage.groupId,
});

export const getMessagesByGroupId = async (di: DI, groupId: GroupId) => {
    const documents = await di.mongo
        .db()
        .collection("message")
        .find({ groupId })
        .toArray();

    return documents.map(mapDocumentToMessage);
};

export const addMessage = async (di: DI, newMessage: NewMessage) => {
    const newDocument = mapNewMessageToDocument(newMessage);
    const result = await di.mongo
        .db()
        .collection("message")
        .insertOne(newDocument);

    return result.insertedId;
};

export const removeMessageByGroupId = async (di: DI, groupId: GroupId) => {
    await di.mongo.db().collection("message").deleteMany({ groupId });
};
