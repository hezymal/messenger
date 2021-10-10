import { Group, GroupId, NewGroup } from "types/group";
import { request } from "./api";

const baseUrl = (version = "1.0") => `/api/${version}/groups`;

export const getGroups = () => request<Group[]>({ url: baseUrl() });

export const addGroup = (newGroup: NewGroup) =>
    request<{ id: GroupId }>({
        url: baseUrl(),
        method: "POST",
        data: newGroup,
    });

export const removeGroup = (id: GroupId) =>
    request({
        url: `${baseUrl()}/${id}`,
        method: "DELETE",
    });
