/*jshint esversion: 9 */
// MODELS
const Auth = require('../models/Auth');
// MIDDLEWARE
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// UTILS
const geocoder = require('../utils/geocoder');

// @desc Get all users
// @desc GET /api/v1/auth
// @access Public
exports.getUsers =asyncHandler( async (req, res, next) => {
	let query;

	let queryStr = JSON.stringify(req.query);

	queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

	// console.log(queryStr);
	let users;

	if(!queryStr){
		users = await Auth.find().select('name email');
	}
	if(queryStr){
		users = await Auth.find(JSON.parse(queryStr));
	}

	res.status(200).json({
		success: true,
		data: users,
		results: users.length
	});
});

// @desc Get a user
// @desc GET /api/v1/auth/:id
// @access Public
exports.getUser = asyncHandler( async (req, res, next) => {
	const user = await Auth.findById(req.params.id).select('name email');

	if(!user) {
		return next(
			new ErrorResponse('User Not Found', 404)
		);
	}

	res.status(200).json({
		success: true,
		data: user
	});
});

// @desc Create a user
// @desc POST /api/v1/auth
// @access Public
exports.addUser = asyncHandler( async (req, res, next) => {
	const user = await Auth.create(req.body); // ({firstname:req.body.firstName})
	// optioanlly - pass in the fields to be accepted
	res.status(201).json({
		success: true,
		data: user
	});
});

// @desc Update a user
// @desc PUT /api/v1/auth/:id
// @access Private
exports.updateUser = asyncHandler( async (req, res, next) => {
	const user = await Auth.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if(!user) {
		// return the first response
		return res.status(404).json({
			success: false,
			msg: "User not found"
		});
	}

	res.status(200).json({
		success: true,
		msg: "Updated User",
		data: user
	});
});

// @desc Delete a user
// @desc Delete /api/v1/auth/:id
// @access Private
exports.deleteUser = asyncHandler( async (req, res, next) => {
	const user = await Auth.findByIdAndDelete(req.params.id);

	if(!user) {
		// return the first response
		return res.status(404).json({
			success: false,
			msg: "User not found"
		});
	}

	res.status(200).json({
		success: true,
		msg: "Deleted User"
	});
});

// @desc GET users by radius
// @desc Delete /api/v1/auth/radius/:zipcode/:distance
// @access Private
exports.getUsersInRadius = asyncHandler( async ( req, res, next ) => {
	const { zipcode, distance} = req.params;
	// GET LAT/LNG FROM GEOCODER
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;
	// CALCULATE RADIUS
	// DIVIDE DISTANCE BY RADIUS of EARTH = 3963 MI / 6378 KM
	const radius = distance / 6378 ;
	const users = await Auth.find({
	    location: {
		$geoWithin: { $centerSphere: [[ lng, lat ], radius ]}}
	});
    
	res.status(200).json({
	    success: true,
	    results: users.length,
	    data: users
	});
});