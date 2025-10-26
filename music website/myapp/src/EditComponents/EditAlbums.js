import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Sidebar';

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    img: ''
  });

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/albums/getAlbumById/${id}`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album data:', error);
        toast.error('Failed to load album data.', { position: 'top-right' });
      }
    };

    fetchAlbum();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAlbum(prevAlbum => ({ ...prevAlbum, [name]: value }));
  };

  const handleUpdateAlbum = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/albums/updateAlbum/${id}`, album);
      toast.success(response.data.msg, { position: 'top-right' });
      navigate('/allalbums');
    } catch (error) {
      console.error('Error updating album:', error);
      toast.error('Failed to update album. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <main className="container mx-auto px-6 py-4">
          <Toaster />
          <h1 className="text-2xl font-bold mb-4">Edit Album</h1>
          <div className="bg-white p-6 rounded shadow">
            <form onSubmit={handleUpdateAlbum} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['title', 'artist', 'releaseDate', 'img'].map(field => (
                <div className="flex flex-col" key={field}>
                  <label htmlFor={field} className="font-semibold capitalize">{field}</label>
                  <input
                    type={field === 'releaseDate' ? 'date' : 'text'}
                    id={field}
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={album[field]}
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
                  Update Album
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditAlbum;
