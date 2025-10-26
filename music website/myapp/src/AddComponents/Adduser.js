import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Adduser() {
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '123-456-7890', address: '123 Main St', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYywj6b0PD-Bgh7exk5gX3BHVSDzRbMlzpyw&s', gender: 'Male' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210', address: '456 Elm St', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYywj6b0PD-Bgh7exk5gX3BHVSDzRbMlzpyw&s', gender: 'Female' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', contact: '456-789-0123', address: '789 Oak Ave', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYywj6b0PD-Bgh7exk5gX3BHVSDzRbMlzpyw&s', gender: 'Male' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    picture: '',
    gender: '',
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.contact || !newUser.address || !newUser.picture || !newUser.gender) {
      toast.error('All fields are required', { position: 'top-right' });
      return;
    }

    try {
      console.log('Sending user data:', newUser);  // Debugging

      const response = await axios.post('http://localhost:3000/users/createUser', newUser);
      
      console.log('Response:', response);  // Debugging
      
      toast.success(response.data.msg, { position: 'top-right' });

      const addedUser = { ...newUser, id: users.length + 1 };
      setUsers([...users, addedUser]);

      setNewUser({
        name: '',
        email: '',
        contact: '',
        address: '',
        picture: '',
        gender: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);  // Debugging
      toast.error('Error adding user. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <main className="container mx-auto px-6 py-4">
          <Toaster />
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          <div className="bg-white p-6 rounded shadow">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Add New User</h2>
              <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={newUser.name}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact" className="font-semibold">Contact</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Enter contact number"
                    value={newUser.contact}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="font-semibold">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={newUser.address}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="picture" className="font-semibold">Picture URL</label>
                  <input
                    type="text"
                    id="picture"
                    name="picture"
                    placeholder="Enter picture URL"
                    value={newUser.picture}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender" className="font-semibold">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    placeholder="Enter gender"
                    value={newUser.gender}
                    onChange={inputHandler}
                    className="px-4 py-2 border rounded-md mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Adduser;
