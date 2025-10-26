import express from 'express';
import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  getArtistCount
} from '../controllers/artistsController.js';

const router = express.Router();

router.post('/createArtist', createArtist);
router.get('/getAllArtists', getAllArtists);
router.get('/getArtistById/:id', getArtistById);
router.patch('/updateArtist/:id', updateArtist); 
router.delete('/deleteArtist/:id', deleteArtist);
router.get('/getArtistCount',getArtistCount);

export default router;
