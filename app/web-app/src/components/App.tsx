import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import "./App.css";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/chat" />
                </Route>
                <Route path="/chat">
                    <ChatPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
