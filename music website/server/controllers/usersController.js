import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "No user data provided" });
    }

    const userData = new User(req.body);
    await userData.save();
    res.status(201).json({ msg: "User created successfully", user: userData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "User updated successfully", user: updatedData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user count
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments(); 
    res.status(200).json({ totalUsers: count }); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
