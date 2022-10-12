import React from "react";
import styled from "styled-components";

import { borders, colors, pt } from "design/styles";

const StyledLogo = styled.a`
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

export const Logo: React.VFC = () => {
    return <StyledLogo href="/">Mess:enger</StyledLogo>;
};
