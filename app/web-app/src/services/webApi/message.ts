import { GroupId } from "logic/group";
import { Message, MessageId, NewMessage } from "logic/message";
import { request } from "./api";

const baseUrl = (version = "1.0") => `/api/${version}/messages`;

export const getMessagesByGroupId = (groupId: GroupId) =>
    request<Message[]>({ url: `${baseUrl()}/groups/${groupId}` });

export const addMessage = (newMessage: NewMessage) =>
    request<{ id: MessageId }>({
        method: "POST",
        url: baseUrl(),
        data: newMessage,
    });
