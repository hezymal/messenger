import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { borders, colors, pt } from "design/styles";

export interface InputProps {
    value: string;
    borderRight?: boolean;
    placeholder?: string;
    width?: number;
    onChange: (value: string) => void;
}

interface ElementProps {
    width: number;
    borderRight: boolean;
    onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

const Element = styled.input<ElementProps>`
    width: ${(props) => props.width}%;
    border-top: 1px solid ${colors.grey.base};
    border-left: 1px solid ${colors.grey.base};
    border-bottom: 1px solid ${colors.grey.base};
    border-top-left-radius: ${borders.radius.default}px;
    border-top-right-radius: ${borders.radius.default}px;
    border-bottom-right-radius: ${borders.radius.default}px;
    border-bottom-left-radius: ${borders.radius.default}px;
    resize: none;
    font: inherit;
    line-height: inherit;
    padding: ${pt(0.5)} ${pt(1)};

    ${(props) =>
        props.borderRight
            ? css`
                  border-right: 1px solid ${colors.grey.base};
              `
            : css`
                  border-right: none;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
              `}

    &:focus {
        outline: none;
    }
`;

export const Input: React.VFC<InputProps> = ({
    placeholder,
    value,
    borderRight = true,
    width = 100,
    onChange,
}) => {
    return (
        <Element
            borderRight={borderRight}
            placeholder={placeholder}
            value={value}
            width={width}
            onChange={(event) => onChange(event.currentTarget.value)}
        />
    );
};
