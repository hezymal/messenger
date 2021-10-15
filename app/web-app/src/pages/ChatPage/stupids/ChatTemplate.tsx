import React, { ReactNode } from "react";
import styled from "styled-components";

import { Cell, Grid } from "design/components/FluidGrid";
import { borders, colors, pt } from "design/styles";

interface Props {
    groups: ReactNode;
    messages: ReactNode;
    inputMessage: ReactNode;
}

const Header = styled(Cell)`
    display: flex;
    align-items: center;
    padding: 0 ${pt(1)};
    background-color: ${colors.blue.light1};
`;

const LeftSide = styled(Cell)`
    background-color: ${colors.blue.light1};
`;

const Logo = styled.a`
    color: ${colors.black.base};
    display: inline-flex;
    align-items: center;
    font-weight: 300;
    font-size: 1.1em;
    padding: ${pt(0.5)} ${pt(1)};
    border-radius: ${borders.radius.default}px;
    text-transform: uppercase;
    text-decoration: none;
    color: ${colors.black.base};

    &:before {
        content: ">";
        color: ${colors.blue.dark2};
        font-size: 1.4em;
        font-weight: 900;
        font-family: monospace;
        margin-right: ${pt(1)};
    }

    &:after {
        content: "_";
        color: ${colors.pink.base};
        font-size: 1.4em;
        font-weight: 900;
        font-family: monospace;
        margin-left: ${pt(0.25)};
    }
`;

export const ChatTemplate: React.VFC<Props> = ({
    groups,
    messages,
    inputMessage,
}) => {
    return (
        <Grid direction="vertical">
            <Header sizeType="fixed" fixedSize={7}>
                <Logo href="/">Mess:enger</Logo>
            </Header>
            <Cell>
                <Grid>
                    <LeftSide
                        sizeType="resizable"
                        resizableSize={{ direction: "right", initialSize: 30 }}
                    >
                        {groups}
                    </LeftSide>
                    <Cell>
                        <Grid direction="vertical">
                            <Cell>{messages}</Cell>
                            <Cell
                                sizeType="resizable"
                                resizableSize={{
                                    direction: "top",
                                    initialSize: 15,
                                }}
                            >
                                {inputMessage}
                            </Cell>
                        </Grid>
                    </Cell>
                </Grid>
            </Cell>
        </Grid>
    );
};
