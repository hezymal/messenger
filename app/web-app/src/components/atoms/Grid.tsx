import React from "react";
import styled, { css } from "styled-components";
import { colors, pt } from "styles";

interface GridProps {
    className?: string;
    height?: number;
}

interface CellProps {
    className?: string;
    width?: number;
    height?: number;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    padding?: boolean;
}

const GridBlock = styled.div<GridProps>`
    display: flex;
    flex-wrap: wrap;
    height: ${({ height }) => (height !== undefined ? `${height}%` : "auto")};
`;

export const CellBlock = styled.div<CellProps>`
    width: ${({ width }) => (width !== undefined ? width : 100)}%;

    ${(props) =>
        props.height !== undefined &&
        css`
            height: ${props.height}%;
        `};

    ${(props) =>
        props.borderTop &&
        css`
            border-top: 1px solid ${colors.grey.base};
        `}

    ${(props) =>
        props.borderLeft &&
        css`
            border-left: 1px solid ${colors.grey.base};
        `}
    
    ${(props) =>
        props.borderRight &&
        css`
            border-right: 1px solid ${colors.grey.base};
        `}

    ${(props) =>
        props.borderBottom &&
        css`
            border-bottom: 1px solid ${colors.grey.base};
        `}

    ${(props) =>
        props.padding &&
        css`
            padding: ${pt(0.25)};
        `}
`;

export const Grid: React.FC<GridProps> = ({ className, children, height }) => {
    return (
        <GridBlock className={className} height={height}>
            {children}
        </GridBlock>
    );
};

export const Cell: React.FC<CellProps> = ({
    children,
    className,
    width,
    height,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    padding,
}) => {
    return (
        <CellBlock
            className={className}
            width={width}
            height={height}
            borderLeft={borderLeft}
            borderRight={borderRight}
            borderTop={borderTop}
            borderBottom={borderBottom}
            padding={padding}
        >
            {children}
        </CellBlock>
    );
};
