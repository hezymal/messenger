import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { borders, colors, pt } from "design/styles";

export type Theme = "normal" | "plat";

export interface InputProps {
    value: string;
    theme?: Theme;
    borderRight?: boolean;
    width?: number;
    autoFocus?: InputHTMLAttributes<HTMLInputElement>["autoFocus"];
    placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    onChange: (value: string) => void;
    onKeyDown?: InputHTMLAttributes<HTMLInputElement>["onKeyDown"];
    onBlur?: InputHTMLAttributes<HTMLInputElement>["onBlur"];
}

interface ElementProps {
    elementWidth: number;
    theme: Theme;
    borderRight: boolean;
}

const getNormalStyles = (props: ElementProps) => {
    const rightBorder = props.borderRight
        ? css`
              border-right: 1px solid ${colors.grey.base};
          `
        : css`
              border-right: none;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
          `;

    return css`
        border-top: 1px solid ${colors.grey.base};
        border-left: 1px solid ${colors.grey.base};
        border-bottom: 1px solid ${colors.grey.base};
        border-top-left-radius: ${borders.radius.default}px;
        border-top-right-radius: ${borders.radius.default}px;
        border-bottom-right-radius: ${borders.radius.default}px;
        border-bottom-left-radius: ${borders.radius.default}px;

        ${rightBorder}
    `;
};

const getPlatStyles = (props: ElementProps) => {
    return css`
        background-color: white;
        border: none;
    `;
};

const Element = styled.input<ElementProps>`
    width: ${(props) => props.elementWidth}%;
    resize: none;
    font: inherit;
    line-height: inherit;
    padding: ${pt(0.5)} ${pt(1)};

    &:focus {
        outline: none;
    }

    ${(props) => {
        switch (props.theme) {
            case "normal":
                return getNormalStyles(props);

            case "plat":
                return getPlatStyles(props);
        }
    }}
`;

export const Input: React.VFC<InputProps> = ({
    placeholder,
    value,
    theme = "normal",
    borderRight = true,
    width = 100,
    onChange,
    ...tail
}) => {
    return (
        <Element
            theme={theme}
            borderRight={borderRight}
            placeholder={placeholder}
            value={value}
            elementWidth={width}
            onChange={(event) => onChange(event.currentTarget.value)}
            {...tail}
        />
    );
};
