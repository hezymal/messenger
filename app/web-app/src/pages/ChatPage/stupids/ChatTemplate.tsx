import React, { ReactNode } from "react";
import styled from "styled-components";

import { Logo } from "components/Logo";
import { Cell, Grid } from "design/components/FluidGrid";
import { colors, pt } from "design/styles";

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

export const ChatTemplate: React.VFC<Props> = ({
    groups,
    messages,
    inputMessage,
}) => {
    return (
        <Grid direction="vertical">
            <Header sizeType="fixed" fixedSize={7}>
                <Logo />
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
