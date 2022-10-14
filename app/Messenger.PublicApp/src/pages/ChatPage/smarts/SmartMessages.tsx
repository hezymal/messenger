import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Messages } from "../stupids/Messages";
import messages from "state/messages";
import { GroupId } from "logic/group";

interface Props {
    groupId: GroupId;
}

export const SmartMessages: React.VFC<Props> = observer(({ groupId }) => {
    useEffect(() => {
        messages.changeGroup(groupId);
    }, [groupId]);

    const isLoading = messages.state !== "done" && messages.state !== "error";

    return (
        <Messages
            messages={messages.data.length > 0 ? messages.data : []}
            isLoading={isLoading}
        />
    );
});
