import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddAlbum() {
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumArtist, setNewAlbumArtist] = useState('');
  const [newAlbumReleaseDate, setNewAlbumReleaseDate] = useState('');
  const [newAlbumImg, setNewAlbumImg] = useState('');

  const handleAddAlbum = async () => {
    const newAlbum = {
      img: newAlbumImg,
      title: newAlbumTitle,
      artist: newAlbumArtist,
      releaseDate: newAlbumReleaseDate,
    };

    try {
      const response = await axios.post('http://localhost:3000/albums/createAlbum', newAlbum);
      // Handle the response if needed
      console.log('Album added:', response.data);
      toast.success('Album added successfully');
      // Reset input fields
      setNewAlbumImg('');
      setNewAlbumTitle('');
      setNewAlbumArtist('');
      setNewAlbumReleaseDate('');
    } catch (error) {
      console.error('Error adding album:', error);
      toast.error('Error adding album');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Album Management</h1>
          <div className="bg-white p-6 rounded shadow">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Add New Album</h2>
              <input
                type="text"
                placeholder="Image URL"
                value={newAlbumImg}
                onChange={(e) => setNewAlbumImg(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="text"
                placeholder="Artist"
                value={newAlbumArtist}
                onChange={(e) => setNewAlbumArtist(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <input
                type="date"
                placeholder="Release Date"
                value={newAlbumReleaseDate}
                onChange={(e) => setNewAlbumReleaseDate(e.target.value)}
                className="px-4 py-2 border rounded-md mr-2"
              />
              <button
                onClick={handleAddAlbum}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default AddAlbum;
