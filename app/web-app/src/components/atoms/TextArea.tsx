import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { pt } from "styles";

interface Props {
    value: string;
    placeholder?: string;
    height?: number;
    onChange: (value: string) => void;
}

type ElementProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    height?: number;
};

const Element = styled.textarea<ElementProps>`
    width: 100%;
    height: ${({ height }) => (height !== undefined ? `${height}%` : "auto")};
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
}) => {
    return (
        <Element
            placeholder={placeholder}
            value={value}
            height={height}
            onChange={(event) => onChange(event.currentTarget.value)}
        />
    );
};
