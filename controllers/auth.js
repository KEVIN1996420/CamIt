/*jshint esversion: 9 */
// MODELS
// const User = require('../models/User');

// @desc Get all users
// @desc GET /api/v1/auth
// @access Public
exports.getUsers = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Show all users",
	});
};

// @desc Get a user
// @desc GET /api/v1/auth/:id
// @access Public
exports.getUser = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Show a user"
	});
};

// @desc Create a user
// @desc POST /api/v1/auth
// @access Public
exports.addUser = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Create a user"
	});
};

// @desc Update a user
// @desc PUT /api/v1/auth/:id
// @access Private
exports.updateUser = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Updated a user"
	});
};

// @desc Delete a user
// @desc Delete /api/v1/auth/:id
// @access Private
exports.deleteUser = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Deleted a user"
	});
};