import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';

function ShowAllAlbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3000/albums/getAllAlbums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        toast.error('Error fetching albums. Please try again.', { position: 'top-right' });
      }
    };

    fetchAlbums();
  }, []);

  const handleDeleteAlbum = async (albumId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/albums/deleteAlbum/${albumId}`);
      toast.success(response.data.msg, { position: 'top-right' });
      setAlbums(prevAlbums => prevAlbums.filter(album => album._id !== albumId));
    } catch (error) {
      console.error('Error deleting album:', error);
      toast.error('Error deleting album. Please try again.', { position: 'top-right' });
    }
  };

  const handleUpdateAlbum = async (albumId) => {
    toast.info('Update album functionality to be implemented', { position: 'top-right' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Toaster />
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">All Albums</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {albums.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {albums.map(album => (
                    <tr key={album._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{album.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{album.artist}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{album.releaseDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={album.img} alt={album.title} className="w-16 h-16 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/editalbum/${album._id}`} className="text-blue-600 hover:text-blue-800 mr-2">
                          Update
                        </Link>
                        <button
                          onClick={() => handleDeleteAlbum(album._id)}
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
              <p className="text-gray-500 text-center">No albums found</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShowAllAlbums;
