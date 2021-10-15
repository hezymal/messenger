import React from "react";
import styled, { css } from "styled-components";

import { pt, colors } from "design/styles";

interface MenuItemProps {
    selected?: boolean;
    onClick?: () => void;
}

interface ItemBlockProps {
    selected: boolean;
}

const MenuBlock = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const ItemBlock = styled.li<ItemBlockProps>`
    padding: ${pt(0.5)} ${pt(1)};
    cursor: pointer;

    &:hover {
        background-color: ${colors.grey.light2};
    }

    ${(props) =>
        props.selected &&
        css`
            cursor: default;
            background-color: ${colors.grey.light2};
            border-right: 3px solid ${colors.blue.base};
        `}
`;

export const Menu: React.FC = ({ children }) => {
    return <MenuBlock>{children}</MenuBlock>;
};

export const MenuItem: React.FC<MenuItemProps> = ({
    children,
    selected = false,
    onClick,
}) => {
    return (
        <ItemBlock
            selected={selected}
            onClick={!selected ? onClick : undefined}
        >
            {children}
        </ItemBlock>
    );
};
