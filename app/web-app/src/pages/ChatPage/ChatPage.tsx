import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import * as navigationPatterns from "navigation/routesPatterns";
import { GroupId } from "logic/group";
import { ChatTemplate } from "./stupids/ChatTemplate";
import { SmartMessages } from "./smarts/SmartMessages";
import { SmartInputMessage } from "./smarts/SmartInputMessage";
import { SmartGroups } from "./smarts/SmartGroups";

const getGroupIdFromPath = (path: string) => {
    const mathes = matchPath<{ id: GroupId }>(path, {
        path: navigationPatterns.chatGroupById(),
    });

    return mathes?.params.id || null;
};

export const ChatPage: React.FC = () => {
    const location = useLocation();
    const groupId = getGroupIdFromPath(location.pathname) as GroupId;

    return (
        <ChatTemplate
            groups={<SmartGroups selected={groupId} />}
            messages={<SmartMessages groupId={groupId} />}
            inputMessage={<SmartInputMessage groupId={groupId} />}
        />
    );
};
