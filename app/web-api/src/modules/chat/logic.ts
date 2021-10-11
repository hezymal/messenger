import { DI } from "../../di";
import { GroupId } from "../group/types";
import { MessageId } from "../message/types";
import { getMessageById } from "../message/logic";

export const replyNewMessage = async (
    di: DI,
    groupId: GroupId,
    messageId: MessageId
) => {
    const message = await getMessageById(di, messageId);
    const clients = di.expressWS.getWss().clients;

    for (const client of clients) {
        const data = {
            type: `/chat/groups/${groupId}/messages`,
            payload: { message },
        };

        client.send(JSON.stringify(data));
    }
};
