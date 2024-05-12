import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className=" text-lime-600 p-4 flex justify-between items-center bg-gradient-to-tr from-[#bcd4d3] to-[rgb(41,197,145)">
      {/* Logo */}
      <NavLink to='/' className="text-xl font-bold uppercase text-blue-400 hover:text-blue-300">
        <img className="w-20 h-20 rounded-full" src='/logo.png'/>
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center">
        {/* Conditional rendering based on user authentication */}
        {user ? (
          <NavLink
            to="/logout"
            className="mr-4 text-lg font-medium hover:text-indigo-900"
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className="mr-4 text-lg font-medium hover:text-indigo-800"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-lg font-medium hover:text-indigo-800"
            >
              Signup
            </NavLink>
          </>
        )}

        {/* Profile Avatar (Replace with user profile image) */}
        {user && (
          <img
            src={user.prof_pic_url}
            alt={user.username}
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
