import { makeObservable, observable, flow } from "mobx";
import { getMessagesByGroupId, addMessage } from "services/web-api";
import { GroupId } from "types/group";
import { Message, NewMessage } from "types/message";
import { AsyncResult } from "utils/types";

export type State = "initialize" | "pending" | "creation" | "error" | "done";

class Messages {
    public state: State;
    public data: Message[] | null;

    private groupId: GroupId | null;

    constructor() {
        this.state = "initialize";
        this.data = null;

        this.groupId = null;

        makeObservable(this, {
            state: observable,
            data: observable,
            fetch: flow,
            add: flow,
        });
    }

    *fetch(groupId: GroupId) {
        this.state = "pending";
        this.groupId = groupId;

        try {
            const response: AsyncResult<typeof getMessagesByGroupId> =
                yield getMessagesByGroupId(groupId);

            if (this.groupId !== groupId) {
                return;
            }

            this.data = response.data;
            this.state = "done";
        } catch (error) {
            if (this.groupId !== groupId) {
                return;
            }

            console.error(error);
            this.state = "error";
        }
    }

    *add(newMessage: NewMessage) {
        if (this.state !== "done") {
            return;
        }

        this.state = "creation";

        try {
            const response: AsyncResult<typeof addMessage> = yield addMessage(
                newMessage
            );
            this.data!.push({
                id: response.data.id,
                ...newMessage,
            });

            this.state = "done";
        } catch (e) {
            console.error(e);

            this.state = "error";
        }
    }
}

export default new Messages();
