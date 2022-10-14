import React, { RefCallback } from "react";
import { colors, pt } from "design/styles";
import styled, { css } from "styled-components";
import { ResizingDirection } from "../types";

export interface CellResizerProps {
    forwardRef: RefCallback<HTMLDivElement>;
    direction: ResizingDirection;
}

interface ElementProps {
    direction: ResizingDirection;
}

const getDirectionStyles = (props: ElementProps) => {
    const { direction } = props;

    if (direction === "top") {
        return css`
            cursor: row-resize;
            width: 100%;
            height: ${pt(1 / 2)};
            left: 0;
            bottom: 100%;
            margin-top: ${pt(1 / -4)};
        `;
    }

    if (direction === "right") {
        return css`
            cursor: col-resize;
            width: ${pt(1 / 2)};
            height: 100%;
            top: 0;
            left: 100%;
            margin-left: ${pt(1 / -4)};
        `;
    }
};

const Element = styled.div<ElementProps>`
    position: absolute;

    ${getDirectionStyles}

    &:focus,
    &:hover {
        background-color: ${colors.blue.base};
    }
`;

export const CellResizer: React.FC<CellResizerProps> = ({
    direction,
    forwardRef,
}) => {
    return (
        <Element
            ref={forwardRef}
            direction={direction}
            tabIndex={0}
            draggable
        />
    );
};
