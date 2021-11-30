/*jshint esversion: 9 */
// MODELS
const Auth = require('../models/Auth');
// MIDDLEWARE
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc Get all users
// @desc GET /api/v1/auth
// @access Public
exports.getUsers =asyncHandler( async (req, res, next) => {
	const users = await Auth.find().select('name email');
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
	const user = await Auth.create(req.body);
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