import { GroupId } from "logic/group";

export const chat = () => `/chat`;

export const chatGroupById = (groupId: GroupId) => `/chat/groups/${groupId}`;
