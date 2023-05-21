import React from "react";
import Users from "./layout/Users";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./layout/Home";
import Login from "./layout/Login"

function App() {
    return (
       <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/users/:userId?' element={<Users />} />
            <Route path="/404" element={<NotFoundPage/>}/>
            <Route path="*" element={<Navigate to='/404' replace />} />
        </Routes>
       </>
    );
}

export default App;
