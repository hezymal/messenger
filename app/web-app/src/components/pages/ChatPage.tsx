import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import * as navigationPatterns from "navigation/patterns";
import { GroupId } from "types/group";
import { ChatTemplate } from "../templates/ChatTemplate";
import { SmartMessages } from "components/organisms/smarts/SmartMessages";
import { SmartInputMessage } from "components/organisms/smarts/SmartInputMessage";
import { SmartGroups } from "components/organisms/smarts/SmartGroups";

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
