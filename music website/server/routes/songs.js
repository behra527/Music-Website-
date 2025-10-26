import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongCount
} from '../controllers/songsController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const router = express.Router();


router.post('/createSong', upload.single('audioFile'), createSong);


router.get('/getAllSongs', getAllSongs);


router.get('/getSongById/:id', getSongById);


router.patch('/updateSong/:id', upload.single('audioFile'), updateSong);


router.delete('/deleteSong/:id', deleteSong);


router.get('/getSongCount', getSongCount);

export default router;
