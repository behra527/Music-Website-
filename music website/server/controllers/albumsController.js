import Album from "../models/Album.js";

// Create a new album
export const createAlbum = async (req, res) => {
  try {
    const albumData = new Album(req.body);
    if (!albumData) {
      return res.status(404).json({ msg: "Album data not found" });
    }

    await albumData.save();
    res.status(200).json({ msg: "Album created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all albums
export const getAllAlbums = async (req, res) => {
  try {
    const albumData = await Album.find();
    if (!albumData) {
      return res.status(404).json({ msg: "Album data not found" });
    }
    res.status(200).json(albumData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an album by ID
export const getAlbumById = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }
    res.status(200).json(albumExist);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an album by ID
export const updateAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Album updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an album by ID
export const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }
    await Album.findByIdAndDelete(id);
    res.status(200).json({ msg: "Album deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAlbumCount = async (req, res) => {
  try {
    const count = await Album.countDocuments();
    res.status(200).json({ totalAlbums: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};