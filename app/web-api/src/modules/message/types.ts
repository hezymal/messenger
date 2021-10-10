import { ObjectId } from "mongodb";
import { GroupId } from "../group/types";

export type MessageId = ObjectId;

export type MessageOwner = "self" | "companion";

export interface Message {
    id: MessageId;
    text: string;
    owner: MessageOwner;
    groupId: GroupId;
}

export interface NewMessage {
    text: string;
    owner: MessageOwner;
    groupId: GroupId;
}
