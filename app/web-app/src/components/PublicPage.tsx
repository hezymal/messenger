import React from "react";
import styled from "styled-components";

import { Logo } from "components/Logo";
import { colors } from "design/styles";

interface Props {
    title?: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const Card = styled.div`
    width: 320px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.div`
    color: ${colors.grey.dark1};
    line-height: 28px;
`;

const Content = styled.div`
    padding: 24px 0 16px;
`;

export const PublicPage: React.FC<Props> = ({ children, title }) => {
    return (
        <Container>
            <Card>
                <Header>
                    <Logo />
                    {title && <Title> # {title}</Title>}
                </Header>
                <Content>{children}</Content>
            </Card>
        </Container>
    );
};
