import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './input.css';
import AuthorizationPage from "./components/AuthorizationPage";
import {Auth0Provider} from "@auth0/auth0-react";
import Marketplace from "./components/Marketplace";
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Auth0Provider
        domain="tapwatero.uk.auth0.com"
        clientId="kkV3B9YoJNxSt6CwDkzGTtfPWF2imEsM"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}>
        <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<AuthorizationPage/>}></Route>
            <Route path={"/dashboard"} element={<Dashboard/>}></Route>
            <Route path={"/marketplace"} element={<Marketplace/>}></Route>
            <Route path={"/users/:userID"} element={<h1>User Profile</h1>}></Route>
        </Routes>
    </BrowserRouter>
    </Auth0Provider>
);
