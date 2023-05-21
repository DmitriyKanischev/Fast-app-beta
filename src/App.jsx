import React from "react";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login"

function App() {
    return (
       <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/users' element={<Users />} />
        </Routes>
       </>
    );
}

export default App;
