import React from "react";
import { NavLink } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Songs from "./Songs";
import Albums from "./Albums";
import Artists from "./Artists";
import User from "./User";
function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-gray-500">Welcome to your music admin panel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NavLink to="/songs">
              <Songs />
            </NavLink>
            <NavLink to="/user">
              <User />
            </NavLink>
            <NavLink to="/albums">
              <Albums />
            </NavLink>
            <NavLink to="/artists">
              <Artists />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
