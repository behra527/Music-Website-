import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const initialArtists = [
  { id: 1, name: 'Artist One', genre: 'Pop', picture: 'https://t3.ftcdn.net/jpg/03/26/52/14/360_F_326521465_d3Lv3za5GEGqYAR3M8bem2mHY1vjvmJP.jpg' },
  { id: 2, name: 'Artist Two', genre: 'Rock', picture: 'https://media.timeout.com/images/103641882/750/422/image.jpg' },
  { id: 3, name: 'Artist Three', genre: 'Hip Hop', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYywj6b0PD-Bgh7exk5gX3BHVSDzRbMlzpyw&s' },
];
function AddArtist() {
  const [artists, setArtists] = useState(initialArtists);
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistGenre, setNewArtistGenre] = useState('');
  const [newArtistPicture, setNewArtistPicture] = useState('');

  const handleAddArtist = async () => {
    const newArtist = {
      name: newArtistName,
      genre: newArtistGenre,
      picture: newArtistPicture,
    };
  
    try {
      
      await axios.post('http://localhost:3000/artists/createArtist', newArtist);
      setArtists([...artists, { ...newArtist, id: Date.now() }]); 
      setNewArtistName('');
      setNewArtistGenre('');
      setNewArtistPicture('');
      toast.success('Artist added successfully');
    } catch (error) {
      console.error('Error adding artist:', error);
      toast.error('Error adding artist');
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <main className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold mb-4">Artist Management</h1>
          <div className="bg-white p-6 rounded shadow">
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Add New Artist</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newArtistName}
                  onChange={(e) => setNewArtistName(e.target.value)}
                  className="px-4 py-2 border rounded-md flex-grow"
                />
                <input
                  type="text"
                  placeholder="Genre"
                  value={newArtistGenre}
                  onChange={(e) => setNewArtistGenre(e.target.value)}
                  className="px-4 py-2 border rounded-md flex-grow"
                />
                <input
                  type="text"
                  placeholder="Picture URL"
                  value={newArtistPicture}
                  onChange={(e) => setNewArtistPicture(e.target.value)}
                  className="px-4 py-2 border rounded-md flex-grow"
                />
                <button
                  onClick={handleAddArtist}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md md:ml-2 md:w-28"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default AddArtist;
