import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';

const EditArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState({
    name: '',
    genre: '',
    picture: ''
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/artists/getArtistById/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist data:', error);
        toast.error('Failed to load artist data.', { position: 'top-right' });
      }
    };

    fetchArtist();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setArtist(prevArtist => ({ ...prevArtist, [name]: value }));
  };

  const handleUpdateArtist = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/artists/updateArtist/${id}`, artist);
      toast.success(response.data.msg, { position: 'top-right' });
      navigate('/allartist');
    } catch (error) {
      console.error('Error updating artist:', error);
      toast.error('Failed to update artist. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <main className="container mx-auto px-6 py-4">
          <Toaster />
          <h1 className="text-2xl font-bold mb-4">Edit Artist</h1>
          <div className="bg-white p-6 rounded shadow">
            <form onSubmit={handleUpdateArtist} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'genre', 'picture'].map(field => (
                <div className="flex flex-col" key={field}>
                  <label htmlFor={field} className="font-semibold capitalize">{field}</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={artist[field]}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
                >
                  Update Artist
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditArtist;
