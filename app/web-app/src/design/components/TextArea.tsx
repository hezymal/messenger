import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled from "styled-components";
import { pt } from "design/styles";

interface Props {
    value?: string;
    placeholder?: string;
    height?: number;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

interface ElementProps {
    elementHeight?: number;
}

const Element = styled.textarea<ElementProps>`
    width: 100%;
    height: ${({ elementHeight }) => (elementHeight !== undefined ? `${elementHeight}%` : "auto")};
    border: none;
    resize: none;
    font: inherit;
    line-height: inherit;
    padding: ${pt(0.5)} ${pt(1)};

    &:focus {
        outline: none;
    }
`;

export const TextArea: React.VFC<Props> = ({
    placeholder,
    value,
    height,
    onChange,
    onKeyDown,
}) => {
    return (
        <Element
            placeholder={placeholder}
            value={value}
            elementHeight={height}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};
