import { makeObservable, observable, flow, action } from "mobx";
import { Subscription } from "rxjs";

import { getMessagesByGroupId, addMessage, subscribeToWebSocket } from "services/webApi";
import { GroupId } from "logic/group";
import { Message, NewMessage } from "logic/message";
import { AsyncResult } from "utils/types";

export type State = "initialize" | "pending" | "creation" | "error" | "done";

interface WSPayload {
    message: Message;
}

class Messages {
    public state: State;
    public data: Message[];
    private groupId: GroupId | null;
    private groupSubscription: Subscription | null;

    constructor() {
        this.state = "initialize";
        this.data = [];
        this.groupId = null;
        this.groupSubscription = null;

        this.subscribeToGroup = this.subscribeToGroup.bind(this);
        this.addMessage = this.addMessage.bind(this);

        makeObservable(this, {
            state: observable,
            data: observable,
            changeGroup: flow,
            create: flow,
            addMessage: action,
        });
    }

    public *changeGroup(groupId: GroupId) {
        this.state = "pending";

        this.groupId = groupId;
        this.groupSubscription?.unsubscribe();
        this.groupSubscription = this.subscribeToGroup(groupId);

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

    public *create(newMessage: NewMessage) {
        if (this.state !== "done") {
            return;
        }

        this.state = "creation";

        try {
            yield addMessage(newMessage);
            this.state = "done";
        } catch (e) {
            console.error(e);

            this.state = "error";
        }
    }

    public addMessage(message: Message) {
        this.data.push(message);
    }

    private subscribeToGroup(groupId: GroupId) {
        const messageType = `/chat/groups/${groupId}/messages`;

        return subscribeToWebSocket<WSPayload>(messageType, (payload) => {
            this.addMessage(payload.message);
        });
    }
}

export default new Messages();
