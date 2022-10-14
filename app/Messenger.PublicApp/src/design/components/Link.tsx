import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import { colors } from "design/styles";

interface Props {
    to: string;
}

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    font-weight: 700;
    color: ${colors.blue.dark2};

    &:hover {
        text-decoration: none;
        color: ${colors.pink.base};
    }
`;

export const Link: React.FC<Props> = (props) => {
    return (
        <StyledLink {...props} />
    );
};
