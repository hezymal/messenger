import React, { Fragment } from "react";

import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuTrigger,
} from "components/atoms/ContextMenu";
import { Menu, MenuItem } from "components/atoms/Menu";
import { Cell, Grid } from "components/atoms/Grid";
import { Group, GroupId } from "types/group";
import { LinearSpinner } from "components/moleculus/LinearSpinner";
import { InputWithButton } from "components/moleculus/InputWithButton";

interface Props {
    selectedGroupId: GroupId;
    groups: Group[];
    isLoading: boolean;
    newGroupTitle: string;
    onGroupSelect: (groupId: GroupId) => void;
    onNewGroupTitleChange: (newTitle: string) => void;
    onNewGroupSubmit: () => void;
    onGroupRemove: (groupId: GroupId) => void;
}

export const Groups: React.VFC<Props> = ({
    selectedGroupId,
    groups,
    isLoading,
    newGroupTitle,
    onGroupSelect,
    onNewGroupTitleChange,
    onNewGroupSubmit,
    onGroupRemove,
}) => {
    return (
        <Fragment>
            <ContextMenuTrigger
                menuId="context-menu-groups"
                elementId="groups"
                height={100}
            >
                <Grid height={100}>
                    <Cell>
                        <Menu>
                            {groups.map((group) => (
                                <ContextMenuTrigger
                                    key={group.id}
                                    menuId="context-menu-groups-item"
                                    elementId={group.id}
                                >
                                    <MenuItem
                                        selected={group.id === selectedGroupId}
                                        onClick={() => onGroupSelect(group.id)}
                                    >
                                        {group.title}
                                    </MenuItem>
                                </ContextMenuTrigger>
                            ))}
                            <LinearSpinner show={isLoading} />
                        </Menu>
                    </Cell>
                    <Cell padding>
                        <InputWithButton
                            buttonTitle="Add"
                            placeholder="New group title..."
                            value={newGroupTitle}
                            onChange={onNewGroupTitleChange}
                            onSubmit={onNewGroupSubmit}
                        />
                    </Cell>
                </Grid>
            </ContextMenuTrigger>
            <ContextMenu id="context-menu-groups">
                <ContextMenuItem iconType="plus" onSelect={() => {}}>
                    Add
                </ContextMenuItem>
            </ContextMenu>
            <ContextMenu id="context-menu-groups-item">
                <ContextMenuItem iconType="plus" onSelect={() => {}}>
                    Add
                </ContextMenuItem>
                <ContextMenuItem
                    iconType="minus"
                    onSelect={(groupId) => onGroupRemove(groupId as GroupId)}
                >
                    Remove
                </ContextMenuItem>
            </ContextMenu>
        </Fragment>
    );
};
