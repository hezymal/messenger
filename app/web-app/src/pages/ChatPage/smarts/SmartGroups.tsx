import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { routes } from "navigation/routes";
import { GroupId } from "logic/group";
import groups from "state/groups";

import { Groups } from "../stupids/Groups";

interface Props {
    selected: GroupId;
}

export const SmartGroups: React.VFC<Props> = observer(({ selected }) => {
    const history = useHistory();
    const [newGroupTitle, setNewGroupTitle] = useState("");
    const [showNewGroupInput, setShowNewGroupInput] = useState(false);

    useEffect(() => {
        groups.fetch();
    }, []);

    const handleGroupSelect = (groupId: GroupId) => {
        history.push(routes.chatGroupById(groupId));
    };

    const handleNewGroupSubmit = async () => {
        setShowNewGroupInput(false);
        if (!newGroupTitle) {
            return;
        }

        try {
            await groups.add({ title: newGroupTitle });
            setNewGroupTitle("");
        } catch (error) {
            console.error(error);
            setShowNewGroupInput(true);
        }
    };

    const handleGroupRemove = async (groupId: GroupId) => {
        await groups.remove(groupId);

        if (groupId === selected) {
            history.push(routes.chat());
        }
    };

    const handleAddGroup = () => {
        setShowNewGroupInput(true);
    };

    const data = groups.data || [];
    const isLoading = groups.state !== "done" && groups.state !== "error";

    return (
        <Groups
            selectedGroupId={selected}
            groups={data}
            isLoading={isLoading}
            newGroupTitle={newGroupTitle}
            showNewGroupInput={showNewGroupInput}
            onGroupSelect={handleGroupSelect}
            onNewGroupTitleChange={setNewGroupTitle}
            onNewGroupSubmit={handleNewGroupSubmit}
            onGroupRemove={handleGroupRemove}
            onAddGroup={handleAddGroup}
        />
    );
});
