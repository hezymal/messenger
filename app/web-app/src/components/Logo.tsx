import React from "react";
import styled, { keyframes } from "styled-components";

import { borders, colors, pt } from "design/styles";

const blinkAnimation = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

const StyledLogo = styled.a`
    color: ${colors.black.base};
    display: inline-flex;
    align-items: center;
    font-weight: 300;
    font-size: 1.1em;
    padding: ${pt(0.5)} ${pt(3)} ${pt(0.5)} ${pt(1)};
    border-radius: ${borders.radius.default}px;
    text-transform: uppercase;
    text-decoration: none;
    color: ${colors.black.base};
    position: relative;

    &:before {
        content: ">";
        color: ${colors.blue.dark2};
        font-size: 1.4em;
        font-weight: 900;
        font-family: monospace;
        margin-top: -2px;
        margin-right: 6px;
    }

    &:after {
        animation: ${blinkAnimation} 0.6s ease-in-out infinite;
        background-color: ${colors.pink.base};
        content: "";
        left: calc(100% - 18px);
        bottom: 4px;
        position: absolute;
        width: 12px;
        height: 3px;
    }
`;

export const Logo: React.VFC = () => {
    return <StyledLogo href="/">Mess:enger</StyledLogo>;
};
