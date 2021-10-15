import React, {
    Children,
    PureComponent,
    ReactNode,
    RefCallback,
    PropsWithChildren,
    cloneElement,
    isValidElement,
} from "react";
import styled, { css } from "styled-components";

import { ptToPx } from "design/styles";
import { GridDirection } from "../types";
import { Cell, CellInjectionProps, CellPropsWithInjection } from "./Cell";

export interface GridProps {
    className?: string;
    direction?: GridDirection;
}

interface GridBlockProps {
    direction: GridDirection;
}

const GridBlock = styled.div<GridBlockProps>`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;

    ${(props) => {
        const { direction } = props;

        if (direction === "horizontal") {
            return css`
                flex-direction: row;
            `;
        }

        if (direction === "vertical") {
            return css`
                flex-direction: column;
            `;
        }
    }}
`;

class CellState {
    private _props: CellPropsWithInjection;
    private _element: HTMLDivElement | null;
    private _resizer: HTMLDivElement | null;

    constructor(props: CellPropsWithInjection) {
        this.resize = this.resize.bind(this);
        this.resizeToPosition = this.resizeToPosition.bind(this);
        this.autoResize = this.autoResize.bind(this);
        this.getFixedSize = this.getFixedSize.bind(this);
        this.getElementSize = this.getElementSize.bind(this);

        this._props = props;
        this._element = null;
        this._resizer = null;
    }

    public get element() {
        return this._element;
    }

    public set element(element: HTMLDivElement | null) {
        this._element = element;
    }

    public set resizer(resizer: HTMLDivElement | null) {
        this._resizer = resizer;
    }

    public resizeToPosition(x: number, y: number) {
        if (!this.element) {
            return;
        }

        const rect = this.element.getBoundingClientRect();
        const gridDirection = this._props.injectionProps.direction;
        const resizingDirection = this._props.resizableSize?.direction;

        if (gridDirection === "horizontal") {
            if (resizingDirection === "right") {
                this.resize(x - rect.left + "px");
            }
        }

        if (gridDirection === "vertical") {
            if (resizingDirection === "top") {
                this.resize(rect.height + rect.top - y + "px");
            }
        }
    }

    public autoResize(siblingsSizes: number) {
        const size = this.getElementSize(siblingsSizes);
        if (size !== null) {
            this.resize(size);
        }
    }

    private resize(size: string) {
        if (!this.element) {
            return;
        }

        const gridDirection = this._props.injectionProps.direction;

        if (gridDirection === "horizontal") {
            this.element.style.width = size;

            if (this._resizer) {
                this._resizer.style.left = size;
            }
        }

        if (gridDirection === "vertical") {
            this.element.style.height = size;

            if (this._resizer) {
                const resizingDirection = this._props.resizableSize?.direction;

                if (resizingDirection === "top") {
                    this._resizer.style.bottom = size;
                } else {
                    this._resizer.style.top = size;
                }
            }
        }
    }

    public getFixedSize(): number | null {
        if (!this.element) {
            return null;
        }

        switch (this._props.sizeType) {
            case "fixed":
                return ptToPx(this._props.fixedSize ?? 0);

            case "resizable": {
                const direction = this._props.injectionProps.direction;
                const rect = this.element.getBoundingClientRect();

                return direction === "horizontal" ? rect.width : rect.height;
            }

            case "relative": {
                if (this._props.relativeMinSize !== undefined) {
                    return ptToPx(this._props.relativeMinSize);
                }

                break;
            }
        }

        return 0;
    }

    private getElementSize(siblingsSizes: number): string | null {
        if (!this.element) {
            return null;
        }

        switch (this._props.sizeType) {
            case "fixed":
            case "resizable":
                return this.getFixedSize() + "px";

            case "relative": {
                siblingsSizes -= this.getFixedSize() ?? 0;
                return `calc(100% - ${siblingsSizes}px)`;
            }
        }

        return "auto";
    }
}

export class Grid extends PureComponent<GridProps> {
    static defaultProps: GridProps = {
        direction: "horizontal",
    };

    private cells: CellState[];
    private resizingCellIndex: number | null;

    constructor(props: PropsWithChildren<GridProps>) {
        super(props);

        this.setElementToCellState = this.setElementToCellState.bind(this);
        this.setResizerToCellState = this.setResizerToCellState.bind(this);
        this.refreshCellsSizes = this.refreshCellsSizes.bind(this);
        this.handleDocumentDragOver = this.handleDocumentDragOver.bind(this);
        this.renderChildren = this.renderChildren.bind(this);

        this.resizingCellIndex = null;
        this.cells = Grid.createCellsStatesFromProps(props);
    }

    static getInjectionProps(props: GridProps): CellInjectionProps {
        return {
            direction: props.direction!,
        };
    }

    static createCellsStatesFromProps(props: PropsWithChildren<GridProps>) {
        return Children.map<CellState, ReactNode>(props.children, (cell) => {
            if (!isValidElement(cell)) {
                throw new Error(`Bad child: ${cell}`);
            }

            const cellProps: CellPropsWithInjection = {
                ...cell.props,
                sizeType: cell.props.sizeType || Cell.defaultProps!.sizeType,
                border: cell.props.border || Cell.defaultProps!.border,
                padding: cell.props.padding || Cell.defaultProps!.padding,
                injectionProps: Grid.getInjectionProps(props),
            };

            return new CellState(cellProps);
        }) as CellState[];
    }

    setElementToCellState(index: number, element: HTMLDivElement | null) {
        this.cells[index].element = element;
    }

    setResizerToCellState(index: number, resizer: HTMLDivElement | null) {
        this.cells[index].resizer = resizer;

        resizer?.addEventListener("dragstart", () => {
            // TODO: remove handler after cell destroy
            this.resizingCellIndex = index;
        });

        resizer?.addEventListener("dragend", () => {
            // TODO: remove handler after cell destroy
            this.resizingCellIndex = null;
        });
    }

    refreshCellsSizes() {
        let siblingsSizes = 0;
        for (const cell of this.cells) {
            siblingsSizes += cell.getFixedSize() ?? 0;
        }

        for (const cell of this.cells) {
            cell.autoResize(siblingsSizes);
        }
    }

    handleDocumentDragOver(event: DragEvent) {
        if (this.resizingCellIndex === null) {
            return;
        }

        const cell = this.cells[this.resizingCellIndex];
        cell.resizeToPosition(event.pageX, event.pageY);
        this.refreshCellsSizes();
    }

    componentDidMount() {
        document.addEventListener("dragover", this.handleDocumentDragOver);
        this.refreshCellsSizes();
    }

    componentWillUnmount() {
        document.removeEventListener("dragover", this.handleDocumentDragOver);
    }

    renderChildren() {
        const injectionProps = Grid.getInjectionProps(this.props);

        return Children.map(this.props.children, (cell, index) => {
            if (!isValidElement(cell)) {
                throw new Error(`Bad child: ${cell}`);
            }

            const handleElementRef: RefCallback<HTMLDivElement> = (element) =>
                this.setElementToCellState(index, element);

            const handleResizerRef: RefCallback<HTMLDivElement> = (element) =>
                this.setResizerToCellState(index, element);

            return cloneElement(cell, {
                injectionProps,
                elementRef: handleElementRef,
                resizerRef: handleResizerRef,
            });
        });
    }

    render() {
        const { children, direction, ...tail } = this.props;

        return (
            <GridBlock
                children={this.renderChildren()}
                direction={direction!}
                {...tail}
            />
        );
    }
}
