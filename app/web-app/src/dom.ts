let rootElement: HTMLDivElement | null = null;
let contextMenuElement: HTMLDivElement | null = null;

const getOrCreateBodyDivElement = (id: string): HTMLDivElement => {
    let element = document.getElementById(id) as HTMLDivElement | null;
    if (!element) {
        element = document.createElement("div");
        element.id = id;
        document.body.appendChild(element);
    }

    return element;
};

export const getRootElement = () => {
    if (!rootElement) {
        rootElement = getOrCreateBodyDivElement("root");
    }

    return rootElement;
};

export const getContextMenuElement = () => {
    if (!contextMenuElement) {
        contextMenuElement = getOrCreateBodyDivElement("context-menu");
    }

    return contextMenuElement;
};
