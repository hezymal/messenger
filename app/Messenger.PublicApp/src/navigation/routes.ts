import { GroupId } from "logic/group";

const chat = () => `/chat`;

const chatGroupById = (groupId: GroupId) => `/chat/groups/${groupId}`;

const forgotPassword = () => "/forgot-password";

const landing = () => "/landing";

const login = () => "/login";

const register = () => "/register";

export const routes = {
    chat,
    chatGroupById,
    forgotPassword,
    landing,
    login,
    register,
};
