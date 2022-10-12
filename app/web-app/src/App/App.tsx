import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { routes } from "navigation/routes";
import { ChatPage } from "pages/ChatPage";
import { ForgotPasswordPage } from "pages/ForgotPasswordPage";
import { LandingPage } from "pages/LandingPage";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";

import "./App.css";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={routes.chat()} />
                </Route>
                <Route path={routes.forgotPassword()}>
                    <ForgotPasswordPage />
                </Route>
                <Route path={routes.landing()}>
                    <LandingPage />
                </Route>
                <Route path={routes.login()}>
                    <LoginPage />
                </Route>
                <Route path={routes.register()}>
                    <RegisterPage />
                </Route>
                <Route path={routes.chat()}>
                    <ChatPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
