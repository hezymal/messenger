import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled from "styled-components";
import { pt } from "design/styles";

interface Props {
    className?: string;
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
    display: block;
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
    className,
    placeholder,
    value,
    height,
    onChange,
    onKeyDown,
}) => {
    return (
        <Element
            className={className}
            placeholder={placeholder}
            value={value}
            elementHeight={height}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};
