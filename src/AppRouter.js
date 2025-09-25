import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import App2 from "./App2"
import './App2.css';


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/app2" element={<App2 />} />
        </Routes>
    );
}

export default AppRouter;
