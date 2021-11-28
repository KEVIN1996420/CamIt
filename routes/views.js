/* jshint esversion: 9 */

// // PACKAGES
const express = require('express');

// // MIDDLEWARE
// const asyncHandler = require('../middleware/async');

const {
	// getWeather,
	// getMapBox,
	getMapBoxWeather
    } =require('../controllers/views');

const router = express.Router();

// WEATHER API
// router.route('/weather')
// 	.get(getWeather);
// MAPBOX API
// router.route('/mapbox')
// 	.get(getMapBox);

// WEATHER API & MAPBOX API
router.route('/mapbox-weather/:address')
	.get(getMapBoxWeather);

// app.get('/register', (req, res) => {
// 	res.send("This is the Register");
// });

// app.get('/login', (req, res) => {
// 	res.send("This is the Login");
// });

// app.get('/me', (req, res) => {
// 	res.send("This is the User page");
// });

module.exports = router;