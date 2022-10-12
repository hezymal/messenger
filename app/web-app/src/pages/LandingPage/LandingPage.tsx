import React from "react";
import styled from "styled-components";

import { Logo } from "components/Logo";
import { Link } from "design/components/Link";

const Layout = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const Card = styled.div`
    width: 480px;
    margin: 0 auto;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: center;
`;

const CardContent = styled.div`
    text-align: center;
    padding: 16px 0;
`;

const Or = styled.span`
    margin: 0 8px;
`;

export const LandingPage: React.FC = () => {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>
                <CardContent>
                    <Link to="/login">Log In</Link>
                    <Or>or</Or>
                    <Link to="/register">Create Account</Link>
                </CardContent>
            </Card>
        </Layout>
    );
};
