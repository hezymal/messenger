import React from "react";
import { Button, ButtonColor, ButtonProps } from "components/atoms/Button";
import { Icon, IconType } from "components/atoms/Icon";
import styled, { css } from "styled-components";
import { pt } from "styles";

type Size = "md" | "square-lg";

interface Props {
    color?: ButtonColor;
    size?: Size;
    leftIcon?: IconType;
    rightIcon?: IconType;
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
    onClick,
}) => {
    return (
        <StyledButton size={size} color={color} onClick={onClick}>
            {leftIcon && <Icon type={leftIcon} />}
            {leftIcon && children && <Space />}
            {children}
            {rightIcon && children && <Space />}
            {rightIcon && <Icon type={rightIcon} />}
        </StyledButton>
    );
};
