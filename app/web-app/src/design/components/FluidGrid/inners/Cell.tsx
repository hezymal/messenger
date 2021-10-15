import { colors, pt } from "design/styles";
import React, { Fragment, ReactNode, RefCallback } from "react";
import styled, { css } from "styled-components";
import { CellSizeType, GridDirection, ResizingDirection } from "../types";
import { CellResizer } from "./CellResizer";

export interface CellProps {
    children: ReactNode;
    className?: string;
    sizeType?: CellSizeType;
    fixedSize?: number;
    resizableSize?: {
        initialSize: number;
        direction: ResizingDirection;
    };
    relativeMinSize?: number;
    border?: boolean;
    padding?: boolean;
}

export interface CellInjectionProps {
    direction: GridDirection;
}

export interface CellPropsWithInjection extends CellProps {
    injectionProps: CellInjectionProps;
}

export interface CellPropsWithInjectionAndRefs extends CellPropsWithInjection {
    elementRef: RefCallback<HTMLDivElement>;
    resizerRef: RefCallback<HTMLDivElement>;
}

interface CellElementProps {
    sizeType: CellSizeType;
    injectionProps: CellInjectionProps;
    className?: string;
    border: boolean;
    padding: boolean;
    resizableSize?: {
        initialSize: number;
        direction: ResizingDirection;
    };
    relativeMinSize?: number;
}

const CellElement = styled.div<CellElementProps>`
    position: relative;
    z-index: 0;

    ${(props) =>
        props.padding &&
        css`
            padding: ${pt(0.25)};
        `}

    ${(props) =>
        props.injectionProps.direction === "horizontal" &&
        css`
            height: 100%;
        `}

    ${(props) =>
        props.injectionProps.direction === "vertical" &&
        css`
            width: 100%;
        `}

    ${(props) => {
        const {
            border,
            injectionProps: { direction },
        } = props;

        if (border) {
            if (direction === "horizontal") {
                return css`
                    border-right: 1px solid ${colors.grey.base};

                    &:last-child {
                        border-right: none;
                    }
                `;
            }

            if (direction === "vertical") {
                return css`
                    border-bottom: 1px solid ${colors.grey.base};

                    &:last-child {
                        border-bottom: none;
                    }
                `;
            }
        }
    }}

    ${(props) => {
        const {
            sizeType,
            injectionProps: { direction },
            resizableSize,
            relativeMinSize,
        } = props;

        if (sizeType === "content") {
            return css`
                flex-shrink: 1;
            `;
        }

        if (sizeType === "fixed") {
            return css`
                flex-shrink: 0;
            `;
        }

        if (sizeType === "resizable") {
            if (direction === "horizontal") {
                return css`
                    z-index: 1;
                    flex-shrink: 0;
                    width: ${pt(resizableSize!.initialSize!)};
                `;
            }

            if (direction === "vertical") {
                return css`
                    z-index: 1;
                    flex-shrink: 0;
                    height: ${pt(resizableSize!.initialSize!)};
                `;
            }
        }

        if (sizeType === "relative") {
            if (relativeMinSize !== undefined) {
                if (direction === "horizontal") {
                    return css`
                        min-width: ${pt(relativeMinSize)};
                        flex-shrink: 10;
                    `;
                }

                if (direction === "vertical") {
                    return css`
                        min-height: ${pt(relativeMinSize)};
                        flex-shrink: 10;
                    `;
                }
            }
        }
    }}
`;

const ResizableCellContent = styled.div`
    height: 100%;
    overflow: auto;
`;

export const Cell: React.FC<CellProps> = (props) => {
    let {
        sizeType,
        border,
        padding,
        children,
        injectionProps,
        resizableSize,
        elementRef,
        resizerRef,
        ...tail
    } = props as CellPropsWithInjectionAndRefs;

    if (sizeType === "resizable") {
        children = (
            <Fragment>
                <ResizableCellContent>{children}</ResizableCellContent>
                <CellResizer
                    forwardRef={resizerRef}
                    direction={resizableSize!.direction}
                />
            </Fragment>
        );
    }

    return (
        <CellElement
            sizeType={sizeType!}
            children={children}
            border={border!}
            padding={padding!}
            injectionProps={injectionProps}
            ref={elementRef}
            resizableSize={resizableSize}
            {...tail}
        />
    );
};

Cell.defaultProps = {
    sizeType: "relative",
    border: true,
    padding: false,
};
