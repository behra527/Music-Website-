import Artist from "../models/Artist.js";

// Create a new artist
export const createArtist = async (req, res) => {
  try {
    const artistData = new Artist(req.body);

    if (!artistData) {
      return res.status(404).json({ msg: "Artist data not found" });
    }

    await artistData.save();
    res.status(200).json({ msg: "Artist created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all artists
export const getAllArtists = async (req, res) => {
  try {
    const artistData = await Artist.find();
    if (!artistData) {
      return res.status(404).json({ msg: "Artist data not found" });
    }
    res.status(200).json(artistData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an artist by ID
export const getArtistById = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.status(200).json(artistExist);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an artist by ID
export const updateArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Artist updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an artist by ID
export const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    await Artist.findByIdAndDelete(id);
    res.status(200).json({ msg: "Artist deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getArtistCount = async (req, res) => {
  try {
    const count = await Artist.countDocuments(); 
    res.status(200).json({ totalArtists: count }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
