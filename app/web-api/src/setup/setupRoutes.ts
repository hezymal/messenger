import { DI } from "../di";
import { createActions as createGroupActions } from "../modules/group/actions";
import { createActions as createMessageActions } from "../modules/message/actions";

export const setupRoutes = (di: DI) => {
    const groupActions = createGroupActions(di);
    const messageActions = createMessageActions(di);

    di.express.get("/api/1.0/groups", groupActions.getGroups);
    di.express.post("/api/1.0/groups", groupActions.addGroup);
    di.express.delete("/api/1.0/groups/:groupId", groupActions.removeGroup);

    di.express.post("/api/1.0/messages", messageActions.addMessage);
    di.express.get(
        "/api/1.0/messages/groups/:groupId",
        messageActions.getMessagesByGroupId
    );

    di.express.ws("/", (ws, req) => {});
};
