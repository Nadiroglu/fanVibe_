import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <NavLink to='/' className="text-xl font-bold uppercase text-blue-400 hover:text-blue-300">
        Fan VIBE
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center">
        {/* Conditional rendering based on user authentication */}
        {user ? (
          <NavLink
            to="/logout"
            className="mr-4 text-sm font-medium hover:text-gray-300"
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className="mr-4 text-sm font-medium hover:text-gray-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-sm font-medium hover:text-gray-300"
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
