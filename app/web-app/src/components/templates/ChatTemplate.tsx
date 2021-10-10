import { Cell, Grid } from "components/atoms/Grid";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { borders, colors, pt } from "styles";

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

const InputMessage = styled(Cell)`
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
        <Grid height={100}>
            <Header height={7} borderBottom>
                <Logo href="/">
                    Mess:enger
                </Logo>
            </Header>
            <LeftSide width={20} height={93} borderRight>
                {groups}
            </LeftSide>
            <Cell width={80} height={93}>
                <Cell height={80}>{messages}</Cell>
                <InputMessage height={20} borderTop>
                    {inputMessage}
                </InputMessage>
            </Cell>
        </Grid>
    );
};
