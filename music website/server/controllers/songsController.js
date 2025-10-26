import Song from '../models/Song.js';
import path from 'path';
import fs from 'fs';


export const createSong = async (req, res) => {
  try {
    const { title, artist, releaseDate, img, time } = req.body;
    const audioFile = req.file ? req.file.path : null; // Get the path of the uploaded audio file

    const songData = new Song({
      title,
      artist,
      releaseDate,
      img,
      time,
      audioFile
    });

    await songData.save();
    res.status(200).json({ msg: 'Song created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a song by ID
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    if (req.file && song.audioFile) {
      fs.unlinkSync(song.audioFile);
    }

    const updatedData = {
      ...req.body,
      audioFile: req.file ? req.file.path : song.audioFile, 
    };

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }

    
    if (song.audioFile) {
      fs.unlinkSync(song.audioFile);
    }

    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongCount = async (req, res) => {
  try {
    const count = await Song.countDocuments();
    res.status(200).json({ totalSongs: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
