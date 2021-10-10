import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Messages } from "components/organisms/Messages";
import messages from "state/messages";
import { GroupId } from "types/group";

interface Props {
    groupId: GroupId;
}

export const MessagesContainer: React.VFC<Props> = observer(({ groupId }) => {
    useEffect(() => {
        messages.fetch(groupId);
    }, [groupId]);

    const isLoading = messages.state !== "done" && messages.state !== "error";

    return <Messages messages={messages.data || []} isLoading={isLoading} />;
});
