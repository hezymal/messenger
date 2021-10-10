import { Request, Response } from "express";
import { GroupId, NewGroup } from "./types";
import * as logic from "./logic";
import { DI } from "../../di";

interface RequestParams {
    groupId: GroupId;
}

export const createActions = (di: DI) => {
    const getGroups = async (request: Request, response: Response) => {
        const groups = await logic.getGroups(di);
        response.json(groups);
    };

    const addGroup = async (request: Request, response: Response) => {
        const newGroup = request.body as NewGroup;
        const result = await logic.addGroup(di, newGroup);
        response.json({ id: result });
    };

    const removeGroup = async (
        request: Request<RequestParams>,
        response: Response
    ) => {
        await logic.removeGroup(di, request.params.groupId);
        response.end();
    };

    return {
        getGroups,
        addGroup,
        removeGroup,
    };
};
