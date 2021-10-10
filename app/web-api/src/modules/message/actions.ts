import { Request, Response } from "express";
import { DI } from "../../di";
import { GroupId } from "../group/types";
import * as logic from "./logic";
import { NewMessage } from "./types";

interface RequestParams {
    groupId: GroupId;
}

export const createActions = (di: DI) => {
    const getMessagesByGroupId = async (request: Request<RequestParams>, response: Response) => {
        const { groupId } = request.params;
        const messages = await logic.getMessagesByGroupId(di, groupId);
        response.json(messages);
    };

    const addMessage = async (request: Request, response: Response) => {
        const newMessage = request.body as NewMessage;
        const messageId = await logic.addMessage(di, newMessage);
        response.json({ id: messageId });
    };

    return {
        getMessagesByGroupId,
        addMessage,
    };
};
