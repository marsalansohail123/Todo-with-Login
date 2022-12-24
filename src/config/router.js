import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

export const Routing = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
} 