import { makeObservable, observable, flow } from "mobx";
import { addGroup, getGroups, removeGroup } from "services/webApi";
import { Group, GroupId, NewGroup } from "logic/group";
import { AsyncResult } from "utils/types";

export type GroupsState =
    | "initialize"
    | "pending"
    | "creation"
    | "deletion"
    | "error"
    | "done";

class Groups {
    public state: GroupsState;
    public data: Group[];

    constructor() {
        this.state = "initialize";
        this.data = [];

        makeObservable(this, {
            state: observable,
            data: observable,
            fetch: flow,
            add: flow,
            remove: flow,
        });
    }

    *fetch() {
        this.state = "pending";

        try {
            const response: AsyncResult<typeof getGroups> = yield getGroups();
            this.data = response.data;
            this.state = "done";
        } catch (e) {
            console.error(e);

            this.state = "error";
        }
    }

    *add(newGroup: NewGroup) {
        if (this.state !== "done") {
            return;
        }

        this.state = "creation";

        try {
            const response: AsyncResult<typeof addGroup> = yield addGroup(
                newGroup
            );
            this.data!.push({
                id: response.data.id,
                ...newGroup,
            });

            this.state = "done";
        } catch (e) {
            console.error(e);

            this.state = "error";
        }
    }

    *remove(id: GroupId) {
        if (this.state !== "done") {
            return;
        }

        this.state = "deletion";

        try {
            yield removeGroup(id);

            this.data = this.data.filter(group => group.id !== id);
            this.state = "done";
        } catch (e) {
            console.error(e);

            this.state = "error";
        }
    }
}

export default new Groups();
