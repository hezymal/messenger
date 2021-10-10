import React, {
    MouseEvent,
    Component,
    MouseEventHandler,
    isValidElement,
    Children,
    cloneElement,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { getContextMenuElement } from "dom";
import { Button, ButtonProps } from "./Button";
import { Icon, IconType } from "./Icon";
import { borders, colors, pt } from "styles";

interface TriggerProps {
    height?: number;
}

interface ContextMenuTriggerProps {
    menuId: string;
    elementId: string;
    height?: number;
}

interface ContextMenuProps {
    id: string;
}

interface ContextMenuItemProps
    extends Omit<ButtonProps, "onContextMenu" | "onClick"> {
    menuId?: string;
    iconType?: IconType;
    onSelect: (elementId: string) => void;
}

const Trigger = styled.div<TriggerProps>`
    height: ${({ height }) => (height !== undefined ? `${height}%` : "auto")};
`;

const Menu = styled.div`
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    margin-top: 1px;
    border-radius: ${borders.radius.default}px;
    background-color: ${colors.grey.light};
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    padding: ${pt(1 / 2)} 0;
    flex-direction: column;
`;

const MenuItem = styled(Button)`
    text-align: left;
    border: none;
    border-radius: 0;
    background-color: transparent;
    padding: ${pt(1 / 2)} ${pt(2)};
`;

const MenuItemIcon = styled(Icon)`
    margin-right: ${pt(2)};
`;

const data: any = {};

export class ContextMenuTrigger extends Component<ContextMenuTriggerProps> {
    private menuElement: HTMLElement | null;

    constructor(props: ContextMenuTriggerProps) {
        super(props);

        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.menuElement = null;
    }

    handleContextMenu(event: MouseEvent) {
        event.preventDefault();

        if (!this.menuElement) {
            return;
        }

        this.menuElement.style.display = "flex";
        this.menuElement.style.left = `${event.pageX}px`;
        this.menuElement.style.top = `${event.pageY}px`;

        data[this.props.menuId] = this.props.elementId;
    }

    handleDocumentClick() {
        if (!this.menuElement) {
            return;
        }

        this.menuElement.style.display = "none";
    }

    componentDidMount() {
        const { menuId } = this.props;

        this.menuElement = document.getElementById(menuId) as HTMLElement;
        document.addEventListener("click", this.handleDocumentClick, true);
        document.addEventListener(
            "contextmenu",
            this.handleDocumentClick,
            true
        );
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick, true);
        document.removeEventListener(
            "contextmenu",
            this.handleDocumentClick,
            true
        );
    }

    render() {
        return (
            <Trigger
                onContextMenu={this.handleContextMenu}
                height={this.props.height}
            >
                {this.props.children}
            </Trigger>
        );
    }
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ id, children }) => {
    const element = getContextMenuElement();

    children = Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                menuId: id,
            });
        }

        return child;
    });

    return createPortal(<Menu id={id}>{children}</Menu>, element);
};

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
    menuId,
    children,
    iconType,
    onSelect,
    ...tail
}) => {
    const disableContextMenu: MouseEventHandler = (event) => {
        event.preventDefault();
    };

    return (
        <MenuItem
            onContextMenu={disableContextMenu}
            onClick={() => onSelect(data[menuId as string])}
            {...tail}
        >
            {iconType && <MenuItemIcon type={iconType} />}
            {children}
        </MenuItem>
    );
};
