import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { InputMessage } from "components/organisms/InputMessage";
import { GroupId } from "types/group";
import messages from "state/messages";

interface Props {
    groupId: GroupId;
}

export const InputMessageContainer: React.VFC<Props> = observer(({ groupId }) => {
    const [text, setText] = useState("");

    const handleSubmit = async () => {
        await messages.add({ groupId, owner: "self", text });
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
