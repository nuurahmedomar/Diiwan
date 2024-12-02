import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { uname, pwd } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username: uname });
    if (!user) {
      return res.render('login', { success: null, error: 'User not found' });
    }

    // Check if the password matches (plaintext comparison)
    if (pwd !== user.password) {
      return res.render('login', { success: null, error: 'Invalid password' });
    }

    // Successful login
    req.session.user = user; // Store user info in session
    res.render('index', { success: 'Login successful', error: null });
  } catch (error) {
    res.render('login', { success: null, error: 'Server error. Please try again.' });
  }
};

export default loginUser;
