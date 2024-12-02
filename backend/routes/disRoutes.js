// routes/disRoutes.js
import express from 'express';
import {
    getAllDistricts,
    getDistrictById,
    createDistrict,
    updateDistrict,
    deleteDistrict
} from '../controllers/disController.js';

const router = express.Router();

// Route to get all districts
router.get('/', getAllDistricts);

// Route to get a district by ID
router.get('/:id', getDistrictById);

// Route to create a new district
router.post('/', createDistrict);

// Route to update a district by ID
router.put('/:id', updateDistrict);

// Route to delete a district by ID
router.delete('/:id', deleteDistrict);

export default router;
