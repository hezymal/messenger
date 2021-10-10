import React from "react";
import styled, { css } from "styled-components";

import { borders, colors, pt } from "styles";
import { Message, MessageOwner } from "types/message";
import { LinearSpinner } from "components/moleculus/LinearSpinner";

interface Props {
    messages: Message[];
    isLoading: boolean;
}

interface ItemProps {
    owner: MessageOwner;
}

const Block = styled.div`
    padding: ${pt(0.5)} ${pt(1)};
`;

const Item = styled.div<ItemProps>`
    display: flex;

    ${(props) =>
        props.owner === "self" &&
        css`
            text-align: right;
            justify-content: flex-end;
        `};
`;

const Bubble = styled.div`
    background-color: ${colors.grey.light2};
    border-radius: ${borders.radius.default}px;
    margin: 0 0 ${pt(1)} 0;
    padding: ${pt(0.5)} ${pt(1)};
`;

export const Messages: React.VFC<Props> = ({ messages, isLoading }) => {
    return (
        <Block>
            {messages.map((message) => (
                <Item key={message.id} owner={message.owner}>
                    <Bubble>{message.text}</Bubble>
                </Item>
            ))}
            <LinearSpinner show={isLoading} />
        </Block>
    );
};
