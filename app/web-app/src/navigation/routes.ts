import { GroupId } from "types/group";

export const chat = () => `/chat`;

export const chatGroupById = (groupId: GroupId) => `/chat/groups/${groupId}`;
