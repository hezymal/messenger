import React, { Children, isValidElement, cloneElement } from "react";
import styled from "styled-components";

interface GridProps {
    gutter: number;
}

interface CellProps {
    gutter?: number;
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
}

const StyledGrid = styled.div<GridProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ${(props) => {
        const gutter = props.gutter;

        return `
            margin: 0 0 0 ${gutter / -2}px;
            width: calc(100% + ${gutter}px);
        `;
    }}
`;

export const Cell = styled.div<CellProps>`
    ${(props) => {
        const size = props.size;
        const gutter = props.gutter!;

        return `
            margin: 0 ${gutter / 2}px;
            width: calc(${(size * 100) / 16}% - ${gutter}px);
        `;
    }}
`;

export const Grid: React.FC<GridProps> = ({ children, gutter }) => {
    children = Children.map(children, (child) => {
        if (!isValidElement(child)) {
            return child;
        }

        return cloneElement(child, { ...child.props, gutter });
    });

    return <StyledGrid gutter={gutter}>{children}</StyledGrid>;
};
