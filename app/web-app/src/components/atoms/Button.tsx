import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { borders, colors, pt } from "styles";

export type ButtonColor = "default" | "primary";

export interface ButtonProps {
    borderLeft?: boolean;
    borderLeftRadius?: number;
    color?: ButtonColor;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    width?: number;
    onClick?: () => void;
    onContextMenu?: ButtonHTMLAttributes<HTMLButtonElement>["onContextMenu"];
}

interface ElementProps {
    borderLeft: boolean;
    borderLeftRadius: number | string;
    color: ButtonColor;
    width: number;
}

const Element = styled.button<ElementProps>`
    border-style: solid;
    border-width: 1px;
    border-top-left-radius: ${props => props.borderLeftRadius}px;
    border-top-right-radius: ${borders.radius.default}px;
    border-bottom-right-radius: ${borders.radius.default}px;
    border-bottom-left-radius: ${props => props.borderLeftRadius}px;
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    padding: ${pt(0.5)} ${pt(1)};
    width: ${(props) => props.width}%;
    white-space: nowrap;

    ${(props) =>
        !props.borderLeft &&
        css`
            border-left-width: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        `}

    ${(props) =>
        props.color === "default" &&
        css`
            background-color: ${colors.grey.light};
            border-color: ${colors.grey.base};
            color: ${colors.grey.dark1};

            &:hover,
            &:focus {
                background-color: ${colors.grey.light2};
                color: ${colors.grey.dark};
            }

            &:active {
                background-color: ${colors.grey.light4};
                color: ${colors.grey.dark};
            }
        `}

    ${(props) =>
        props.color === "primary" &&
        css`
            background-color: ${colors.blue.base};
            border-color: ${colors.blue.dark};
            color: ${colors.white.base};

            &:hover,
            &:focus {
                background-color: ${colors.blue.dark};
                border-color: ${colors.blue.dark2};
            }

            &:active {
                background-color: ${colors.blue.dark2};
                border-color: ${colors.blue.dark3};
            }
        `}
`;

export const Button: React.FC<ButtonProps> = ({
    className,
    children,
    borderLeft = true,
    borderLeftRadius = borders.radius.default,
    color = "default",
    type = "button",
    width = 100,
    onClick,
    onContextMenu,
}) => {
    return (
        <Element
            className={className}
            borderLeft={borderLeft}
            borderLeftRadius={borderLeftRadius}
            color={color}
            type={type}
            width={width}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {children}
        </Element>
    );
};
