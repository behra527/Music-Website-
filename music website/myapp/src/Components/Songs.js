import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Songs() {
  const [totalSongs, setTotalSongs] = useState(0);

  useEffect(() => {
   
    const fetchSongCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/songs/getSongCount');
        console.log('API Response:', response.data); 
        setTotalSongs(response.data.totalSongs); 
      } catch (error) {
        console.error('Error fetching song count:', error); 
      }
    };

    fetchSongCount(); 
  }, []); 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <NavLink to="/allsongs">
        <h3 className="text-lg font-semibold mb-4">Total Songs</h3>
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl mr-4">+</div>
          <div>
            <p className="text-gray-500">Total Songs Uploaded</p>
            <p className="text-xl font-semibold">{totalSongs}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Songs;
