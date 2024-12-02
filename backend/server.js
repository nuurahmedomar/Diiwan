import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import connectDB from './config/db.js';
import loginRoute from './routes/loginRoute.js';
import path from 'path';
import disRoutes from './routes/disRoutes.js';
import Dis from './models/Dis.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Add this line immediately after the middleware setup
console.log('Serving static files from:', path.join(__dirname, 'assets'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/scss', express.static(path.join(__dirname, 'scss')));

// Flash Messages Middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/districts', disRoutes);
app.use('', loginRoute);

app.get('/district-page', async (req, res) => {
  try {
    // Fetch all districts from the database
    const districts = await Dis.find();
    
    // Render the district-page.ejs template and pass the districts data
    res.render('district-page', { districts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update a district
// app.put('/districts/:id', async (req, res) => {
//   const { id } = req.params;
//   const { dis_name } = req.body;
//   try {
//     await Dis.findByIdAndUpdate(id, { dis_name });
//     res.status(200).send({ message: 'District updated' });
//   } catch (error) {
//     console.error('Failed to update district:', error);
//     res.status(500).send({ error: 'Failed to update district' });
//   }
// });

// // Route to delete a district
// app.delete('/districts/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Dis.findByIdAndDelete(id);
//     res.status(200).send({ message: 'District deleted' });
//   } catch (error) {
//     console.error('Failed to delete district:', error);
//     res.status(500).send({ error: 'Failed to delete district' });
//   }
// });

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/district-page', (req, res) => {
  res.render('district-page');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
