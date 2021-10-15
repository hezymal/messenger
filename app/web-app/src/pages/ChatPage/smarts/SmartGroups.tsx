import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Groups } from "../stupids/Groups";
import * as routes from "navigation/routes";
import { GroupId } from "logic/group";
import groups from "state/groups";

interface Props {
    selected: GroupId;
}

export const SmartGroups: React.VFC<Props> = observer(({ selected }) => {
    const history = useHistory();
    const [newGroupTitle, setNewGroupTitle] = useState("");

    useEffect(() => {
        groups.fetch();
    }, []);

    const handleGroupSelect = (groupId: GroupId) => {
        history.push(routes.chatGroupById(groupId));
    };

    const handleNewGroupSubmit = () => {
        groups.add({ title: newGroupTitle });
    };

    const handleGroupRemove = async (groupId: GroupId) => {
        await groups.remove(groupId);

        if (groupId === selected) {
            history.push(routes.chat());
        }
    };

    const data = groups.data || [];
    const isLoading = groups.state !== "done" && groups.state !== "error";

    return (
        <Groups
            selectedGroupId={selected}
            groups={data}
            isLoading={isLoading}
            newGroupTitle={newGroupTitle}
            onGroupSelect={handleGroupSelect}
            onNewGroupTitleChange={setNewGroupTitle}
            onNewGroupSubmit={handleNewGroupSubmit}
            onGroupRemove={handleGroupRemove}
        />
    );
});
