import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

interface Props {
    to: string;
}

const StyledLink = styled(RouterLink)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Link: React.FC<Props> = (props) => {
    return (
        <StyledLink {...props} />
    );
};
