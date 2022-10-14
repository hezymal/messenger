import React from "react";
import styled from "styled-components";

import { PublicPage } from "components/PublicPage";
import { Link } from "design/components/Link";

const Links = styled.div`
    text-align: center;
`;

const Separator = styled.span`
    margin: 0 8px;
`;

export const LandingPage: React.VFC = () => {
    return (
        <PublicPage>
            <Links>
                <Link to="/login">Log In</Link>
                <Separator>or</Separator>
                <Link to="/register">Create Account</Link>
            </Links>
        </PublicPage>
    );
};
