import React, {
    Children,
    Fragment,
    PureComponent,
    ReactNode,
    RefObject,
    RefCallback,
    cloneElement,
    isValidElement,
} from "react";
import styled, { css } from "styled-components";
import { colors, pt, ptToPx } from "design/styles";

type GridDirection = "horizontal" | "vertical";

type CellSizeType = "content" | "fixed" | "relative" | "resizable";

interface GridProps {
    className?: string;
    direction?: GridDirection;
    forwardedRef?: RefCallback<HTMLDivElement>;
}

interface GridBlockProps {
    gridDirection: GridDirection;
}

interface CellInjectionProps {
    direction: GridDirection;
}

export interface CellProps {
    children: ReactNode;
    className?: string;
    sizeType?: CellSizeType;
    fixedSize?: number;
    resizableSize?: {
        initialSize: number;
        direction: "top" | "right";
    };
    relativeMinSize?: number;
    border?: boolean;
    padding?: boolean;
    forwardedRef?: RefObject<HTMLDivElement>;
}

interface CellPropsWithInjection extends CellProps {
    injectionProps: CellInjectionProps;
}

interface CellPropsWithInjectionAndRefs extends CellPropsWithInjection {
    elementRef: RefCallback<HTMLDivElement>;
    resizerRef: RefCallback<HTMLDivElement>;
}

interface CellBlockProps {
    sizeType: CellSizeType;
    injectionProps: CellInjectionProps;
    className?: string;
    border?: boolean;
    padding?: boolean;
    resizableSize?: {
        initialSize: number;
        direction: "right";
    };
    relativeMinSize?: number;
}

interface ResizingCell {
    index: number;
    pageX: number;
}

interface GridCellResizeStartHandler {
    (event: DragEvent): void;
}

const GridBlock = styled.div<GridBlockProps>`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: ${({ gridDirection }) =>
        gridDirection === "horizontal" ? "row" : "column"};
    overflow: auto;
`;

const CellBlock = styled.div<CellBlockProps>`
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
                    position: relative;
                    z-index: 1;
                    flex-shrink: 0;
                    width: ${pt(resizableSize!.initialSize!)};
                `;
            }

            if (direction === "vertical") {
                return css`
                    position: relative;
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

const CellResizer = styled.div`
    position: absolute;
    width: ${pt(1 / 2)};
    height: 100%;
    top: 0;
    left: 100%;
    margin-left: ${pt(1 / -4)};

    &:focus,
    &:hover {
        background-color: ${colors.blue.base};
        cursor: col-resize;
    }
`;

class GridCell {
    private _props: CellPropsWithInjection;
    private _element: HTMLDivElement | null;
    private _resizerElement: HTMLDivElement | null;
    private _resizeStartHandler: GridCellResizeStartHandler | null;

    constructor(props: CellPropsWithInjection) {
        this.destroy = this.destroy.bind(this);
        this.resize = this.resize.bind(this);
        this.subscribeToResizeStart = this.subscribeToResizeStart.bind(this);
        this.getElementSize = this.getElementSize.bind(this);

        this._props = props;
        this._element = null;
        this._resizerElement = null;
        this._resizeStartHandler = null;
    }

    public get props() {
        return this._props;
    }

    public get boundingClientRect() {
        if (!this.element) {
            return null;
        }

        return this.element.getBoundingClientRect();
    }

    public get element() {
        return this._element;
    }

    public set element(element: HTMLDivElement | null) {
        this._element = element;
    }

    public get resizerElement() {
        return this._resizerElement;
    }

    public set resizerElement(resizerElement: HTMLDivElement | null) {
        this.unsubscribeToResizeStart();
        this._resizerElement = resizerElement;
    }

    public destroy() {
        this.unsubscribeToResizeStart();
    }

    public resize(size: number | string) {
        if (!this.element) {
            return;
        }

        const direction = this.props.injectionProps.direction;

        size = typeof size === "number" ? size + "px" : size;

        if (direction === "horizontal") {
            this.element.style.width = size;

            if (this.resizerElement) {
                this.resizerElement.style.left = size;
            }
        }

        if (direction === "vertical") {
            this.element.style.height = size;

            if (this.resizerElement) {
                this.resizerElement.style.bottom = size;
            }
        }
    }

    public autoResize(siblingsSizes: number) {
        const size = this.getElementSize(siblingsSizes);
        if (size !== null) {
            this.resize(size);
        }
    }

    public subscribeToResizeStart(handler: GridCellResizeStartHandler) {
        if (!this.resizerElement) {
            return;
        }

        this.unsubscribeToResizeStart();
        this._resizeStartHandler = handler;
        this.resizerElement.addEventListener(
            "dragstart",
            this._resizeStartHandler
        );
    }

    private unsubscribeToResizeStart() {
        if (!this.resizerElement || !this._resizeStartHandler) {
            return;
        }

        this.resizerElement.removeEventListener(
            "dragstart",
            this._resizeStartHandler
        );

        this._resizeStartHandler = null;
    }

    public getElementSize(siblingsSizes: number) {
        if (!this.element) {
            return null;
        }

        let size = "auto";
        const sizeType = this.props.sizeType;

        if (sizeType === "fixed") {
            size = pt(this.props.fixedSize!);
        }

        if (sizeType === "resizable") {
            const direction = this.props.injectionProps.direction;
            const rect = this.element.getBoundingClientRect();

            return direction === "horizontal" ? rect.width : rect.height;
        }

        if (sizeType === "relative") {
            if (this.props.relativeMinSize !== undefined) {
                siblingsSizes -= ptToPx(this.props.relativeMinSize);
            }

            return `calc(100% - ${siblingsSizes}px)`;
        }

        return size;
    }

    public getFixedSize() {
        if (!this.element) {
            return null;
        }

        const { sizeType } = this.props;

        if (sizeType === "fixed") {
            return ptToPx(this.props.fixedSize ?? 0);
        }

        if (sizeType === "resizable") {
            const direction = this.props.injectionProps.direction;
            const rect = this.element.getBoundingClientRect();
            return direction === "horizontal" ? rect.width : rect.height;
        }

        if (sizeType === "relative") {
            if (this.props.relativeMinSize !== undefined) {
                return ptToPx(this.props.relativeMinSize);
            }
        }

        return 0;
    }
}

export class Grid extends PureComponent<GridProps> {
    static defaultProps: GridProps = {
        direction: "horizontal",
    };

    private cells: GridCell[];
    private resizingCell: ResizingCell | null;

    constructor(props: GridProps) {
        super(props);

        this.addCell = this.addCell.bind(this);
        this.setCellElement = this.setCellElement.bind(this);
        this.setCellResizer = this.setCellResizer.bind(this);
        this.handleDocumentDragOver = this.handleDocumentDragOver.bind(this);
        this.renderChildren = this.renderChildren.bind(this);

        this.cells = [];
        this.resizingCell = null;
    }

    addCell(index: number, props: CellPropsWithInjection) {
        if (this.cells[index]) {
            this.cells[index].destroy();
        }

        this.cells[index] = new GridCell(props);
    }

    setCellElement(index: number, element: HTMLDivElement | null) {
        this.cells[index].element = element;
    }

    setCellResizer(index: number, element: HTMLDivElement | null) {
        this.cells[index].resizerElement = element;
        this.cells[index].subscribeToResizeStart((event) => {
            this.resizingCell = { index, pageX: event.pageX };
        });
    }

    refreshCellsSizes() {
        const siblingsSizes = this.cells.reduce(
            (prev, cell) => prev + (cell.getFixedSize() ?? 0),
            0
        );

        for (const cell of this.cells) {
            cell.autoResize(siblingsSizes);
        }
    }

    handleDocumentDragOver(event: DragEvent) {
        if (!this.resizingCell) {
            return;
        }

        const cell = this.cells[this.resizingCell.index];
        const cellRect = cell.boundingClientRect;
        if (cellRect !== null) {
            if (cell.props.injectionProps.direction === "horizontal") {
                cell.resize(event.pageX - cellRect.left);
            } else {
                cell.resize(event.pageY - cellRect.bottom);
            }

            this.refreshCellsSizes();
        }
    }

    componentDidMount() {
        document.addEventListener("dragover", this.handleDocumentDragOver);
        this.refreshCellsSizes();
    }

    componentWillUnmount() {
        document.removeEventListener("dragover", this.handleDocumentDragOver);
    }

    renderChildren() {
        const { children, direction } = this.props;
        const injectionProps: CellInjectionProps = { direction: direction! };

        return Children.map(children, (cell, index) => {
            if (!isValidElement(cell)) {
                throw new Error(`Bad child: ${cell}`);
            }

            const props: CellPropsWithInjection = {
                ...cell.props,
                sizeType: cell.props.sizeType || "relative",
                border: cell.props.border || true,
                padding: cell.props.padding || false,
                injectionProps,
            };

            this.addCell(index, props);

            const handleElementRef: RefCallback<HTMLDivElement> = (element) =>
                this.setCellElement(index, element);

            const handleResizerRef: RefCallback<HTMLDivElement> = (element) =>
                this.setCellResizer(index, element);

            return cloneElement(cell, {
                ...props,
                elementRef: handleElementRef,
                resizerRef: handleResizerRef,
            });
        });
    }

    render() {
        const { children, direction, forwardedRef, ...tail } = this.props;

        return (
            <GridBlock
                children={this.renderChildren()}
                gridDirection={direction!}
                ref={forwardedRef}
                {...tail}
            />
        );
    }
}

export const Cell: React.FC<CellProps> = (props) => {
    let {
        sizeType = "relative",
        border = true,
        padding = false,
        children,
        injectionProps,
        forwardedRef,
        elementRef,
        resizerRef,
        ...tail
    } = props as CellPropsWithInjectionAndRefs;

    if (sizeType === "resizable") {
        children = (
            <Fragment>
                {children}
                <CellResizer draggable ref={resizerRef} tabIndex={0} />
            </Fragment>
        );
    }

    const handleRef = (element: HTMLDivElement) => {
        elementRef && elementRef(element);
        forwardedRef && ((forwardedRef.current as any) = element);
    };

    return (
        <CellBlock
            border={border}
            children={children}
            padding={padding}
            sizeType={sizeType}
            injectionProps={injectionProps}
            ref={handleRef}
            {...tail}
        />
    );
};
