import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddSong() {
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongReleaseDate, setNewSongReleaseDate] = useState('');
  const [newSongImg, setNewSongImg] = useState('');
  const [newSongTime, setNewSongTime] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);

  const handleAddSong = async () => {
    const formData = new FormData();
    formData.append('title', newSongTitle);
    formData.append('artist', newSongArtist);
    formData.append('releaseDate', newSongReleaseDate);
    formData.append('img', newSongImg);
    formData.append('time', newSongTime);
    formData.append('audioFile', newSongFile);

    try {
      await axios.post('http://localhost:3000/songs/createSong', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewSongTitle('');
      setNewSongArtist('');
      setNewSongReleaseDate('');
      setNewSongImg('');
      setNewSongTime('');
      setNewSongFile(null);
      toast.success('Song added successfully');
    } catch (error) {
      console.error('Error adding song:', error);
      toast.error('Error adding song');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add New Song</h1>
          <div className="bg-white p-6 rounded shadow">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="text"
                placeholder="Artist"
                value={newSongArtist}
                onChange={(e) => setNewSongArtist(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="date"
                placeholder="Release Date"
                value={newSongReleaseDate}
                onChange={(e) => setNewSongReleaseDate(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newSongImg}
                onChange={(e) => setNewSongImg(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 3:45)"
                value={newSongTime}
                onChange={(e) => setNewSongTime(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="file"
                onChange={(e) => setNewSongFile(e.target.files[0])}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <button onClick={handleAddSong} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Add Song
              </button>
            </div>
          </div>
        </main>
      </div>
      <Toaster /> 
    </div>
  );
}

export default AddSong;
