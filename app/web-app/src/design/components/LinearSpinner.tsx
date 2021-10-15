import React from "react";
import styled from "styled-components";

import { Spinner } from "./Spinner";

interface Props {
    show: boolean;
}

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const LinearSpinner: React.VFC<Props> = ({ show }) => {
    if (!show) {
        return null;
    }

    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};
