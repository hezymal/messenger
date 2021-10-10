import styled, { keyframes } from "styled-components";
import { pt, colors } from "styles";

const spinnerSizeInPt = 4;
const borderSizeInPx = "8px";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Bracers = styled.div`
    position: relative;
    width: ${pt(spinnerSizeInPt)};
    height: ${pt(spinnerSizeInPt)};
    animation: ${spin} 1s linear infinite;

    &:before {
        content: "";
        position: absolute;
        top: ${pt(1 / 2)};
        left: ${pt(1 / 2)};
        border-top: ${borderSizeInPx} solid ${colors.blue.base};
        border-left: ${borderSizeInPx} solid ${colors.pink.base};
        width: ${pt(spinnerSizeInPt - 2)};
        height: ${pt(spinnerSizeInPt - 2)};
    }

    &:after {
        content: "";
        position: absolute;
        right: ${pt(1 / 2)};
        bottom: ${pt(1 / 2)};
        border-bottom: ${borderSizeInPx} solid ${colors.pink.base};
        border-right: ${borderSizeInPx} solid ${colors.blue.base};
        width: ${pt(spinnerSizeInPt - 2)};
        height: ${pt(spinnerSizeInPt - 2)};
    }
`;

export const Spinner: React.VFC = () => {
    return <Bracers />;
};
