import React, { Fragment } from "react";

import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuTrigger,
} from "design/components/ContextMenu";
import { Menu, MenuItem } from "design/components/Menu";
import { Cell, Grid } from "design/components/FluidGrid";
import { LinearSpinner } from "design/components/LinearSpinner";
import { InputWithButton } from "design/components/InputWithButton";
import { Group, GroupId } from "logic/group";

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
                <Grid direction="vertical">
                    <Cell sizeType="content" border={false}>
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
