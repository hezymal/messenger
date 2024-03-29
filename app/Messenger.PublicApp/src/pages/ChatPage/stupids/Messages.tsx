import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { LinearSpinner } from "design/components/LinearSpinner";
import { borders, colors, pt } from "design/styles";
import { Message, MessageOwner } from "logic/message";
import { debounce } from "lodash";

interface Props {
    messages: Message[];
    isLoading: boolean;
}

interface BubbleProps {
    owner: MessageOwner;
}

const Block = styled.div`
    padding: ${pt(1)};
    overflow-y: auto;
    height: 100%;
`;

const Bubble = styled.div<BubbleProps>`
    border-radius: ${borders.radius.default}px;
    margin: 0 0 ${pt(1)} 0;
    padding: ${pt(0.5)} ${pt(1)};

    ${({ owner }) => {
        if (owner === "self") {
            return css`
                background-color: ${colors.grey.light3};
            `;
        }

        return `
            background-color: ${colors.grey.light2};
        `;
    }}
`;

const Text = styled.div`
    white-space: pre-wrap;
`;

const Item = styled.div`
    display: flex;

    &:last-child {
        ${Bubble} {
            margin: 0;
        }
    }
`;

const AutoScrollableBlock: React.FC = ({ children }) => {
    const withScrollRef = useRef<HTMLDivElement>(null);
    const noScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const withScroll = withScrollRef.current;
        const noScroll = noScrollRef.current;

        if (!withScroll || !noScroll) {
            throw new Error("Elements is not set");
        }

        const handleResize = debounce(() => {
            withScroll.scrollTop = withScroll.scrollHeight;
        }, 200);

        const noScrollObserver = new ResizeObserver(handleResize);
        noScrollObserver.observe(noScroll);

        return () => {
            noScrollObserver.disconnect();
        };
    }, []);

    return (
        <Block ref={withScrollRef}>
            <div ref={noScrollRef}>{children}</div>
        </Block>
    );
};

export const Messages: React.VFC<Props> = ({ messages, isLoading }) => {
    return (
        <AutoScrollableBlock>
            {messages.map((message) => (
                <Item key={message.id}>
                    <Bubble owner={message.owner}>
                        <Text>{message.text}</Text>
                    </Bubble>
                </Item>
            ))}
            <LinearSpinner show={isLoading} />
        </AutoScrollableBlock>
    );
};
