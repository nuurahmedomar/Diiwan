import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by `user_id` or `_id`
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = isNaN(id) ? await User.findById(id) : await User.findOne({ user_id: id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by `user_id` or `_id`
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = isNaN(id)
      ? await User.findByIdAndUpdate(id, req.body, { new: true })
      : await User.findOneAndUpdate({ user_id: id }, req.body, { new: true });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by `user_id` or `_id`
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = isNaN(id)
      ? await User.findByIdAndDelete(id)
      : await User.findOneAndDelete({ user_id: id });

    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
