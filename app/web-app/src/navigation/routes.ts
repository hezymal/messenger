import { GroupId } from "logic/group";

const landing = () => "/landing";

const register = () => "/register";

const chat = () => `/chat`;

const chatGroupById = (groupId: GroupId) => `/chat/groups/${groupId}`;

export const routes = {
    landing,
    chat,
    chatGroupById,
    register,
};
