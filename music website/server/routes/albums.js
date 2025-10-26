import express from 'express';
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumCount
} from '../controllers/albumsController.js';

const router = express.Router();

router.post('/createAlbum', createAlbum);
router.get('/getAllAlbums', getAllAlbums);
router.get('/getAlbumById/:id', getAlbumById);
router.patch('/updateAlbum/:id', updateAlbum); 
router.delete('/deleteAlbum/:id', deleteAlbum);
router.get('/albumCount', getAlbumCount);

export default router;
