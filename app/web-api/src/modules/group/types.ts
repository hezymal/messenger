import { ObjectId } from "mongodb";

export type GroupId = ObjectId;

export interface Group {
    id: GroupId;
    title: string;
}

export interface NewGroup {
    title: string;
}
