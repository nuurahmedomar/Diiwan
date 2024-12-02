// controllers/disController.js
import Dis from '../models/Dis.js';  // Importing the dis model

// Get all districts and render view
export const getAllDistricts = async (req, res) => {
    try {
        const districts = await Dis.find();  // Fetch all documents from the dis collection
        // Render district-page.ejs with data and flash messages
        res.render('district-page', { districts, success: req.flash('success'), error: req.flash('error') });
    } catch (error) {
        req.flash('error', 'Failed to fetch districts');
        res.redirect('/district-page'); // Redirect to district-page with error message
    }
};

// Get a single district by ID
export const getDistrictById = async (req, res

) => {
    try {
        const district = await Dis.findById(req.params.id);  // Find district by ID in the dis collection
        if (!district) {
            req.flash('error', 'District not found');
            return res.redirect('/district-page'); // Redirect to district-page with error message
        }
        res.status(200).json(district); // Respond with district data
    } catch (error) {
        req.flash('error', 'Failed to fetch district');
        res.redirect('/district-page'); // Redirect to district-page with error message
    }
};

// Create a new district
export const createDistrict = async (req, res) => {
    try {
        const { dis_name } = req.body;  // Get district name from the request body
        const newDistrict = new Dis({ dis_name });  // Create a new district instance
        await newDistrict.save();  // Save the new district to the dis collection
        req.flash('success', 'District saved successfully.');
        res.redirect('/district-page'); // Redirect to district-page with success message
    } catch (error) {
        req.flash('error', 'Failed to create district');
        res.redirect('/district-page'); // Redirect to district-page with error message
    }
};

// Update a district by ID
export const updateDistrict = async (req, res) => {
    try {
        const { dis_name } = req.body;  // Get the updated district name
        const updatedDistrict = await Dis.findByIdAndUpdate(
            req.params.id,
            { dis_name },
            { new: true }
        );
        if (!updatedDistrict) {
            req.flash('error', 'District not found');
            return res.redirect('/district-page'); // Redirect to district-page with error message
        }
        req.flash('success', 'District updated successfully.');
        res.redirect('/district-page'); // Redirect to district-page with success message
    } catch (error) {
        req.flash('error', 'Failed to update district');
        res.redirect('/district-page'); // Redirect to district-page with error message
    }
};

// Delete a district by ID
export const deleteDistrict = async (req, res) => {
    try {
        const deletedDistrict = await Dis.findByIdAndDelete(req.params.id);  // Delete the district by ID
        if (!deletedDistrict) {
            req.flash('error', 'District not found');
            return res.redirect('/district-page'); // Redirect to district-page with error message
        }
        req.flash('success', 'District deleted successfully');
        res.redirect('/district-page'); // Redirect to district-page with success message
    } catch (error) {
        req.flash('error', 'Failed to delete district');
        res.redirect('/district-page'); // Redirect to district-page with error message
    }
};
