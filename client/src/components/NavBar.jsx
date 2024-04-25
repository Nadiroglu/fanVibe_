import React from 'react';
import { NavLink } from 'react-router-dom';
// import './NavBar.css'; // Import your custom CSS file for styling

const NavBar = ({ user }) => {
  return (
    <nav className="navbar">
      <NavLink to='/'>
        <h1 className='uppercase text-blue-600 font-sans-bold' >
          Logo
        </h1>
      </NavLink>
      {user ? (
        <NavLink to="/logout" className="nav-link">
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
