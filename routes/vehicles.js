const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');

//check if user is authenticated or not
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// GET handler for rendering the list of vehicles
router.get('/vehicles', async (req, res, next) => {
    try {
        // Retrieve the list of vehicle from the database
        const vehicles = await Vehicle.find();

        // Render the 'vehicles/vehicles.hbs' view with the list of vehicles
        res.render('vehicles/vehicles', {
            title: 'Vehicle List',
            dataset: vehicles,
            user: req.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// GET handler for rendering the form to add a vehicle
router.get('/add', isLoggedIn, function(req, res, next){
    res.render('vehicles/add', { title: 'Add Vehicle', user: req.user });
});

// POST handler for submitting the form to add a vehicle
router.post('/add', isLoggedIn, async (req, res, next) => {
    try {
        // Extract values from the request body
        const { vehicle, model, price } = req.body;

        // Check if required fields are provided
        if (!vehicle || !model || !price) {
            return res.status(400).send('Missing required fields');
        }

        // Create a new team
        const newVehicle = await Vehicle.create({
            vehicle: vehicle,
            model: model,
            price: price
            // Add other fields as needed
        });

        // Redirect to the vehicles page after successful addition
        res.redirect("/vehicles/vehicles");
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            // Handle validation error
            res.status(400).send('Validation Error');
        } else {
            // Handle other errors
            res.status(500).send('Internal Server Error');
        }
    }
});

//edit a vehicle by ID
router.get('/edit/:_id', isLoggedIn, async (req, res, next) => {
    try {
        const vehicleId = req.params._id;
        const vehicle = await Vehicle.findById(vehicleId);
        res.render('vehicles/edit', { title: 'Edit Vehicle', vehicle: vehicle, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Handling the form submission for updating a vehicle (POST)
router.post('/edit/:_id', isLoggedIn, async (req, res, next) => {
    try {
        const vehicleId = req.params._id;
        const { vehicle, model, price } = req.body;

        // Validate the provided data if needed

        // Update the vehicle in the database
        await Vehicle.findByIdAndUpdate(vehicleId, { vehicle, model, price });

        // Redirect to the vehicle page or another appropriate page
        res.redirect('/vehicles/vehicles');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// Delete a team by ID
router.get("/delete/:_id", isLoggedIn, async (req, res, next) => {
    try {
        const vehicleId = req.params._id;

        // Use deleteOne to delete the vehicle
        await Vehicle.deleteOne({ _id: vehicleId });

        // Redirect to the vehicles page after successful deletion
        res.redirect("/vehicles/vehicles");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
