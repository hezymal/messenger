import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { routes } from "navigation/routes";
import { ChatPage } from "pages/ChatPage";
import { LandingPage } from "pages/LandingPage";

import "./App.css";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={routes.chat()} />
                </Route>
                <Route path={routes.chat()}>
                    <ChatPage />
                </Route>
                <Route path={routes.landing()}>
                    <LandingPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
