import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled from "styled-components";

import { Group } from "design/components/Group";
import { TextArea } from "design/components/TextArea";
import { IconButton } from "design/components/IconButton";
import { pt } from "design/styles";

interface Props {
    text: string;
    onTextChange: (newText: string) => void;
    onSubmit: () => void;
}

type ChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;

type KeyboardHandler = KeyboardEventHandler<HTMLTextAreaElement>;

const Block = styled.div`
    position: relative;
    border: none;
    height: 100%;
`;

const Controls = styled(Group)`
    position: absolute;
    top: ${pt(1)};
    right: ${pt(1)};
`;

export const InputMessage: React.FC<Props> = ({
    text,
    onTextChange,
    onSubmit,
}) => {
    const handleChange: ChangeHandler = (event) => {
        onTextChange(event.currentTarget.value);
    };

    const handleKeyDown: KeyboardHandler = (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <Block>
            <TextArea
                placeholder="Type message..."
                value={text}
                height={100}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Controls direction="vertical" padding={false}>
                <IconButton
                    size="square-lg"
                    color="primary"
                    leftIcon="paper-plane"
                    title="Send message (Ctrl + Enter)"
                    onClick={onSubmit}
                />
                <IconButton
                    size="square-lg"
                    leftIcon="file"
                    title="Add file"
                    onClick={() => {}}
                />
            </Controls>
        </Block>
    );
};
