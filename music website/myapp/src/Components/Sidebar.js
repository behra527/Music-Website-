import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-gray-100">
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-semibold">ABS Music Admin</div>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/"
          exact
          className="block py-2 px-4 text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/addsongs"
          className="block py-2 px-4 text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          Songs
        </NavLink>
        <NavLink
          to="/addalbums"
          className="block py-2 px-4 text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          Albums
        </NavLink>
        <NavLink
          to="/addartists"
          className="block py-2 px-4 text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          Artists
        </NavLink>
        <NavLink
          to="/adduser"
          className="block py-2 px-4 text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          Users
        </NavLink>
      </nav>
      {/* <div className="absolute bottom-0 w-full p-4">
        <button className="block w-full py-2 px-4 text-gray-400 hover:text-white text-left">Logout</button>
      </div> */}
    </div>
  );
}

export default Sidebar;
