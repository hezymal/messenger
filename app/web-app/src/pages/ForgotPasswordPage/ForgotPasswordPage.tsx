import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { PublicPage } from "components/PublicPage";
import { Button } from "design/components/Button";
import { Form, Field } from "design/components/Form";
import { Input } from "design/components/Input";
import { Cell, Grid } from "design/components/Grid";
import { routes } from "navigation/routes";

export const ForgotPasswordPage: React.VFC = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");

    const handleCancel = () => {
        history.push(routes.login());
    };

    return (
        <PublicPage title="Forgot Password">
            <Form>
                <Field>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        width={100}
                        onChange={setEmail}
                    />
                </Field>
                <Field>
                    <Grid gutter={16}>
                        <Cell size={8}>
                            <Button type="submit">Send letter to E-mail</Button>
                        </Cell>
                        <Cell size={8}>
                            <Button type="button" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Cell>
                    </Grid>
                </Field>
            </Form>
        </PublicPage>
    );
};
