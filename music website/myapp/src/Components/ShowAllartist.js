import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';

function ShowAllArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/artists/getAllArtists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        toast.error('Error fetching artists. Please try again.', { position: 'top-right' });
      }
    };

    fetchArtists();
  }, []);

  const handleDeleteArtist = async (artistId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/artists/deleteArtist/${artistId}`);
      toast.success(response.data.msg, { position: 'top-right' });
      setArtists(prevArtists => prevArtists.filter(artist => artist._id !== artistId));
    } catch (error) {
      console.error('Error deleting artist:', error);
      toast.error('Error deleting artist. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Toaster />
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">All Artists</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {artists.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {artists.map(artist => (
                    <tr key={artist._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{artist.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{artist.genre}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={artist.picture} alt={artist.name} className="w-16 h-16 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/editartist/${artist._id}`} className="text-blue-600 hover:text-blue-800 mr-2">
                          Update
                        </Link>
                        <button
                          onClick={() => handleDeleteArtist(artist._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center">No artists found</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShowAllArtists;
