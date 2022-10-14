import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { InputMessage } from "../stupids/InputMessage";
import { GroupId } from "logic/group";
import messages from "state/messages";

interface Props {
    groupId: GroupId;
}

export const SmartInputMessage: React.VFC<Props> = observer(({ groupId }) => {
    const [text, setText] = useState("");

    const handleSubmit = async () => {
        await messages.create({ groupId, owner: "self", text });
        setText("");
    };

    return (
        <InputMessage
            text={text}
            onTextChange={setText}
            onSubmit={handleSubmit}
        />
    );
});
