import React, { Fragment, KeyboardEventHandler } from "react";

import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuTrigger,
} from "design/components/ContextMenu";
import { Menu, MenuItem } from "design/components/Menu";
import { Cell, Grid } from "design/components/FluidGrid";
import { LinearSpinner } from "design/components/LinearSpinner";
import { Group, GroupId } from "logic/group";
import { Input } from "design/components/Input";

interface Props {
    selectedGroupId: GroupId;
    groups: Group[];
    isLoading: boolean;
    newGroupTitle: string;
    showNewGroupInput: boolean;
    onGroupSelect: (groupId: GroupId) => void;
    onNewGroupTitleChange: (newTitle: string) => void;
    onNewGroupSubmit: () => void;
    onGroupRemove: (groupId: GroupId) => void;
    onAddGroup: () => void;
}

export const Groups: React.VFC<Props> = ({
    selectedGroupId,
    groups,
    isLoading,
    newGroupTitle,
    showNewGroupInput,
    onGroupSelect,
    onNewGroupTitleChange,
    onNewGroupSubmit,
    onGroupRemove,
    onAddGroup,
}) => {
    const handleNewGroupTitleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === "Enter") {
            onNewGroupSubmit();
        }
    };

    return (
        <Fragment>
            <ContextMenuTrigger
                menuId="context-menu-groups"
                elementId="groups"
                height={100}
            >
                {() => (
                    <Grid direction="vertical">
                        <Cell sizeType="content" border={false}>
                            <Menu>
                                {groups.map((group) => (
                                    <ContextMenuTrigger
                                        key={group.id}
                                        menuId="context-menu-groups-item"
                                        elementId={group.id}
                                    >
                                        {(isMenuShow) => (
                                            <MenuItem
                                                selected={
                                                    group.id === selectedGroupId
                                                }
                                                highlighted={isMenuShow}
                                                onClick={() =>
                                                    onGroupSelect(group.id)
                                                }
                                            >
                                                {group.title}
                                            </MenuItem>
                                        )}
                                    </ContextMenuTrigger>
                                ))}
                                <LinearSpinner show={isLoading} />
                            </Menu>
                        </Cell>
                        {showNewGroupInput && (
                            <Cell>
                                <Input
                                    theme="plat"
                                    autoFocus
                                    placeholder="Type name..."
                                    value={newGroupTitle}
                                    onChange={onNewGroupTitleChange}
                                    onKeyDown={handleNewGroupTitleKeyDown}
                                    onBlur={onNewGroupSubmit}
                                />
                            </Cell>
                        )}
                    </Grid>
                )}
            </ContextMenuTrigger>
            <ContextMenu id="context-menu-groups">
                <ContextMenuItem iconType="plus" onSelect={() => onAddGroup()}>
                    Add
                </ContextMenuItem>
            </ContextMenu>
            <ContextMenu id="context-menu-groups-item">
                <ContextMenuItem iconType="plus" onSelect={() => onAddGroup()}>
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
