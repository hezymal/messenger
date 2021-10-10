import { Flavor } from "utils/types";
import { GroupId } from "./group";

export type MessageId = Flavor<string, "MessageId">;

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
