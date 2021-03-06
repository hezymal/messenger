import React, { FormEventHandler } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Input } from "./Input";

interface Props {
    value: string;
    buttonTitle: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

const Form = styled.form`
    display: flex;
    width: 100%;
`;

export const InputWithButton: React.VFC<Props> = ({
    value,
    buttonTitle,
    placeholder,
    onChange,
    onSubmit,
}) => {
    const handleSubmit: FormEventHandler = (event) => {
        if (!onSubmit) {
            return;
        }

        event.preventDefault();
        onSubmit();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                placeholder={placeholder}
                value={value}
                width={80}
                borderRight={false}
                onChange={onChange}
            />
            <Button type="submit" width={20} borderLeftRadius={0}>
                {buttonTitle}
            </Button>
        </Form>
    );
};
