import { Flavor } from "utils/types";

export type GroupId = Flavor<string, "GroupId">;

export interface NewGroup {
    title: string;
}

export interface Group {
    id: GroupId;
    title: string;
}
