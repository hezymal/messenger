import React, { Children } from "react";
import styled from "styled-components";
import { pt } from "styles";

type Direction = "horizontal" | "vertical";

interface GroupProps {
    direction?: Direction;
    id?: string;
    className?: string;
}

interface BlockProps {
    direction: Direction;
}

const Block = styled.div<BlockProps>`
    display: flex;
    flex-direction: ${(props) =>
        props.direction === "horizontal" ? "row" : "column"};
`;

const Item = styled.div`
    margin: ${pt(0.25)};
`;

export const Group: React.FC<GroupProps> = ({
    children,
    direction = "horizontal",
    id,
    className,
}) => {
    children = Children.map(children, (child) => <Item>{child}</Item>);

    return (
        <Block className={className} id={id} direction={direction}>
            {children}
        </Block>
    );
};
