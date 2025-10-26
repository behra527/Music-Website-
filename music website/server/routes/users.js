import express from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getUserCount
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/createUser', createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getOneUser/:id', getOneUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUserCount', getUserCount);

export default router;
