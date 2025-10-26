import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    picture: '',
    gender: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/getOneUser/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data.', { position: 'top-right' });
      }
    };

    fetchUser();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/users/updateUser/${id}`, user);
      toast.success(response.data.msg, { position: 'top-right' });
      navigate('/alluser');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <main className="container mx-auto px-6 py-4">
          <Toaster />
          <h1 className="text-2xl font-bold mb-4">Edit User</h1>
          <div className="bg-white p-6 rounded shadow">
            <Link to="/" className="text-blue-500 hover:underline">Back</Link>
            <div className="mb-6 mt-4">
              <form onSubmit={handleUpdateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['name', 'email', 'contact', 'address', 'picture', 'gender'].map(field => (
                  <div className="flex flex-col" key={field}>
                    <label htmlFor={field} className="font-semibold capitalize">{field}</label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={user[field]}
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
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
