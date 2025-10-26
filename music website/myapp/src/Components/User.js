
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/getUserCount');
        console.log('API Response:', response.data);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <NavLink to="/alluser">
        <h3 className="text-lg font-semibold mb-4">Total Users</h3>
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl mr-4">+</div>
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-xl font-semibold">{totalUsers}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default User;

