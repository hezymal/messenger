import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type IconType = "file" | "paper-plane" | "plus" | "minus";

interface Props {
    type: IconType;
    className?: string;
}

export const Icon: React.VFC<Props> = ({ className, type }) => {
    return <FontAwesomeIcon className={className} icon={type} />;
};
