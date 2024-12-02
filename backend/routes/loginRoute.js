import express from 'express';
import { loginUser } from '../controllers/loginController.js';  // Assuming login logic is abstracted in controller


const router = express.Router();

router.post('/user', loginUser);

router.get('/', (req, res) => {
  // Render login page, with error and success messages if they exist
  res.render('login', { success: req.flash('success'), error: req.flash('error') });
});

// Dashboard or Home route
router.get('/index', (req, res) => {
  if (req.session.user) {
    res.render('index', { user: req.session.user });
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('/');
  }
});

export default router;
