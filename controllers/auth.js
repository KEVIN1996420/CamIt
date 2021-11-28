/*jshint esversion: 9 */
// MODELS
const Auth = require('../models/Auth');


// @desc Get all users
// @desc GET /api/v1/auth
// @access Public
exports.getUsers = async (req, res, next) => {
	try {
		const users = await Auth.find().select('name email');
		res.status(200).json({
			success: true,
			msg: "Show all users",
			data: users,
			results: users.length
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			msg: "Server Error"
		});
	}
};

// @desc Get a user
// @desc GET /api/v1/auth/:id
// @access Public
exports.getUser = async (req, res, next) => {
	try {
		const user = await Auth.findById(req.params.id).select('name email');

		if(!user) {
			// return the first response
			return res.status(404).json({
				success: false,
				msg: "User not found"
			});
		}

		res.status(200).json({
			success: true,
			msg: "Show all users",
			data: user
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			msg: "Server Error"
		});
	}
};

// @desc Create a user
// @desc POST /api/v1/auth
// @access Public
exports.addUser = async (req, res, next) => {
	try {
		const user = await Auth.create(req.body);
		res.status(201).json({
			success: true,
			data: user
		});
	}catch(err) {
		res.status(400).json({
			success: false,
			error: err.message
		});
	}
};

// @desc Update a user
// @desc PUT /api/v1/auth/:id
// @access Private
exports.updateUser = async (req, res, next) => {
	try {
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
	} catch (err) {
		res.status(500).json({
			success: false,
			msg: "Server Error"
		});
	}
};

// @desc Delete a user
// @desc Delete /api/v1/auth/:id
// @access Private
exports.deleteUser = async (req, res, next) => {
	try {
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
	} catch (err) {
		res.status(500).json({
			success: false,
			msg: "Server Error"
		});
	}
};