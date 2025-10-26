import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Sidebar';

function ShowAllSongs() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/songs/getAllSongs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        toast.error('Error fetching songs. Please try again.', { position: 'top-right' });
      }
    };

    fetchSongs();
  }, []);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
  };

  const handleDeleteSong = async (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/songs/deleteSong/${songId}`);
        toast.success(response.data.msg, { position: 'top-right' });
        // Remove the deleted song from the state
        setSongs(songs.filter(song => song._id !== songId));
      } catch (error) {
        toast.error('Error deleting song. Please try again.', { position: 'top-right' });
        console.error('Error deleting song:', error);
      }
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Toaster />
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">All Songs</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {songs.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {songs.map((song) => (
                    <tr key={song._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{song.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{song.artist}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{song.releaseDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{song.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={song.img} alt={song.title} className="w-16 h-16 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        <button onClick={() => handlePlaySong(song)} className="text-blue-600 hover:text-blue-800">Play</button>
                        <Link to={`/editsong/${song._id}`} className="text-yellow-600 hover:text-yellow-800">Update</Link>
                        <button
                          onClick={() => handleDeleteSong(song._id)}
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
              <p className="text-gray-500 text-center">No songs found</p>
            )}
          </div>
          {currentSong && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">{currentSong.title} - {currentSong.artist}</h2>
              <audio controls src={`http://localhost:3000/${currentSong.audioFile}`} className="w-full rounded-lg shadow-md"></audio>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShowAllSongs;
