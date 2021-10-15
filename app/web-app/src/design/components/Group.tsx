import React, { Children } from "react";
import styled, { css } from "styled-components";
import { pt } from "design/styles";

type Direction = "horizontal" | "vertical";

interface GroupProps {
    direction?: Direction;
    id?: string;
    className?: string;
    padding?: boolean;
}

interface BlockProps {
    direction: Direction;
    padding: boolean;
}

const Block = styled.div<BlockProps>`
    display: flex;
    flex-direction: ${(props) =>
        props.direction === "horizontal" ? "row" : "column"};

    ${(props) =>
        props.padding &&
        css`
            padding: ${pt(0.25)};
        `}
`;

const Item = styled.div`
    margin-bottom: ${pt(0.5)};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Group: React.FC<GroupProps> = ({
    children,
    direction = "horizontal",
    id,
    className,
    padding = true,
}) => {
    children = Children.map(children, (child) => <Item>{child}</Item>);

    return (
        <Block
            className={className}
            id={id}
            direction={direction}
            padding={padding}
        >
            {children}
        </Block>
    );
};
