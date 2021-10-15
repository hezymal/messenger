import React from "react";
import styled, { css } from "styled-components";

import { pt } from "design/styles";
import { Button, ButtonColor, ButtonProps } from "./Button";
import { Icon, IconType } from "./Icon";

type Size = "md" | "square-lg";

interface Props {
    color?: ButtonColor;
    size?: Size;
    leftIcon?: IconType;
    rightIcon?: IconType;
    title?: string;
    onClick: () => void;
}

interface StyledButtonProps extends ButtonProps {
    size: Size;
}

const Space = styled.span`
    display: inline-block;
    width: ${pt(1)};
`;

const StyledButtonBase: React.FC<StyledButtonProps> = ({ size, ...tail }) => (
    <Button {...tail} />
);

const StyledButton = styled(StyledButtonBase)`
    ${({ size }) =>
        size === "square-lg" &&
        css`
            width: ${pt(5)};
            height: ${pt(5)};
            font-size: 1.05rem;
        `}
`;

export const IconButton: React.FC<Props> = ({
    children,
    leftIcon,
    rightIcon,
    size = "md",
    color = "default",
    title,
    onClick,
}) => {
    return (
        <StyledButton size={size} color={color} title={title} onClick={onClick}>
            {leftIcon && <Icon type={leftIcon} />}
            {leftIcon && children && <Space />}
            {children}
            {rightIcon && children && <Space />}
            {rightIcon && <Icon type={rightIcon} />}
        </StyledButton>
    );
};
