import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { PublicPage } from "components/PublicPage";
import { Button } from "design/components/Button";
import { Form, Field } from "design/components/Form";
import { Input } from "design/components/Input";
import { Cell, Grid } from "design/components/Grid";
import { routes } from "navigation/routes";
import { Link } from "design/components/Link";

export const LoginPage: React.VFC = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCancel = () => {
        history.push(routes.landing());
    };

    return (
        <PublicPage title="Log In">
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
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        width={100}
                        onChange={setPassword}
                    />
                </Field>
                <Field>
                    <Link to={routes.forgotPassword()}>Forgot Password</Link>
                </Field>
                <Field>
                    <Grid gutter={16}>
                        <Cell size={8}>
                            <Button type="submit">Login</Button>
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
