import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';

function EditSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    img: '',
    time: ''
  });
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/songs/getSongById/${id}`);
        setSong(response.data);
      } catch (error) {
        toast.error('Failed to load song data.', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const handleUpdateSong = async (e) => {
    e.preventDefault();
    if (!song.title || !song.artist || !song.releaseDate || !song.img || !song.time) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', song.title);
      formData.append('artist', song.artist);
      formData.append('releaseDate', song.releaseDate);
      formData.append('img', song.img);
      formData.append('time', song.time);
      if (audioFile) {
        formData.append('audioFile', audioFile);
      }

      await axios.patch(`http://localhost:3000/songs/updateSong/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Song updated successfully', { position: 'top-right' });
      navigate('/allsongs');
    } catch (error) {
      toast.error('Error updating song. Please try again.', { position: 'top-right' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Toaster />
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Edit Song</h1>
          <div className="bg-white p-6 rounded shadow">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <form onSubmit={handleUpdateSong} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter song title"
                    value={song.title}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="artist" className="block font-semibold mb-1">Artist</label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    placeholder="Enter artist name"
                    value={song.artist}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="releaseDate" className="block font-semibold mb-1">Release Date</label>
                  <input
                    type="text"
                    id="releaseDate"
                    name="releaseDate"
                    placeholder="Enter release date"
                    value={song.releaseDate}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="img" className="block font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    placeholder="Enter image URL"
                    value={song.img}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="Enter duration (e.g., 3:45)"
                    value={song.time}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="audioFile" className="block font-semibold mb-1">Upload Audio</label>
                  <input
                    type="file"
                    id="audioFile"
                    name="audioFile"
                    onChange={handleFileChange}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                  >
                    Update Song
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditSong;
