import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Albums() {
  const [totalAlbums, setTotalAlbums] = useState(0);

  useEffect(() => {
    const fetchAlbumCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/albums/albumCount');
        setTotalAlbums(response.data.totalAlbums);
      } catch (error) {
        console.error('Error fetching album count:', error);
      }
    };

    fetchAlbumCount();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <NavLink to="/allalbums">
        <h3 className="text-lg font-semibold mb-4">Total Albums</h3>
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl mr-4">+</div>
          <div>
            <p className="text-gray-500">Total Albums Uploaded</p>
            <p className="text-xl font-semibold">{totalAlbums}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Albums;
