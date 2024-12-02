import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Route for creating a new user
router.post('/', createUser);

// Route for retrieving all users
router.get('/', getAllUsers);

// Route for retrieving a user by `user_id` or `_id`
router.get('/:id', getUserById);

// Route for updating a user by `user_id` or `_id`
router.put('/:id', updateUser);

// Route for deleting a user by `user_id` or `_id`
router.delete('/:id', deleteUser);

export default router;
