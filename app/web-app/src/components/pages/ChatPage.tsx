import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import * as navigationPatterns from "navigation/patterns";
import { GroupId } from "types/group";
import { ChatTemplate } from "../templates/ChatTemplate";
import { MessagesContainer } from "../containers/MessagesContainer";
import { InputMessageContainer } from "../containers/InputMessageContainer";
import { GroupsContainer } from "../containers/GroupsContainer";

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
            groups={<GroupsContainer selected={groupId} />}
            messages={<MessagesContainer groupId={groupId} />}
            inputMessage={<InputMessageContainer groupId={groupId} />}
        />
    );
};
