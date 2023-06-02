import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <header>
            <NavLink className='m-2' to="/">Home</NavLink>
            <NavLink className='m-2' to="/login">Login</NavLink>
            <NavLink className='m-2' to="/users">Users</NavLink>
        </header>
     );
}
 
export default NavBar;