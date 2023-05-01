import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Leaderboard from "./components/Leaderboard"
import Vote from "./Vote";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Vote/>}></Route>
            <Route path={"/leaderboard"} element={<Leaderboard/>}></Route>
        </Routes>
    </BrowserRouter>
);

