import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Artists() {
  const [totalArtists, setTotalArtists] = useState(0);

  useEffect(() => {
    const fetchArtistCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/artists/getArtistCount');
        console.log('API Response:', response.data);
        setTotalArtists(response.data.totalArtists); 
      } catch (error) {
        console.error('Error fetching artist count:', error);
      }
    };

    fetchArtistCount();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <NavLink to="/allartist">
        <h3 className="text-lg font-semibold mb-4">Total Artists</h3>
        <div className="flex items-center">
          <div className="bg-purple-500 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl mr-4">+</div>
          <div>
            <p className="text-gray-500">Total Artists Registered</p>
            <p className="text-xl font-semibold">{totalArtists}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Artists;
