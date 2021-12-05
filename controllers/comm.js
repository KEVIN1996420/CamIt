/* jshint esversion : 9 */
// MODELS
const Comm = require('../models/Comm');
const Auth = require('../models/Auth');
// UTILS
const ErrorResponse = require('../utils/errorResponse');
// const sendEmail = require('../utils/sendEmail');
// MIDDLEWARE
const asyncHandler = require('../middleware/async');

// @desc Get comms for user or all comms
// @desc GET /api/v1/auth/:id/comm or /api/v1/comm
// @access Public
exports.getComms = asyncHandler(async (req, res, next) => {
	let query;
	
	if (req.params.authId) {
		query = Comm.find({ auth: req.params.authId }).populate('auth').select('name email');
	}else{
		query = Comm.find().populate({
			path: 'auth',
			select: 'name email'
		});

	}
	
	const comms = await query;

	res.status(200).json({
		success: true,
		count: comms.length,
		// data: comms
		comms: comms
	});
});

exports.getComm = asyncHandler(async (req, res, next) => {
	const comm = await Comm.findById(req.params.id).populate('auth');

	if (!comm) {
		return next(new ErrorResponse(`Comm not found with id of ${req.params.id}`, 404));
	}

  	res.status(200).json({ success: true, data: comm });
});

// @desc Add a comm
// @desc POST /api/v1/comm/:id
// @access Private
exports.addComm = asyncHandler(async (req, res, next) => {

	req.body.auth = req.params.id;
	
	// console.log(req.params.id);

	const auth = await Auth.findById(req.params.id);

	if (!auth) {
		return next(new ErrorResponse(`Auth not found with id of ${req.params.authId}`, 404));
	}

	const comm = await Comm.create(req.body);

  	res.status(200).json({ success: true, data: comm });
});

// @desc Update a comm
// @desc PUT /api/v1/comm/:id
// @access Private
exports.updateComm = asyncHandler(async (req, res, next) => {
	// req.body.auth = req.params.id;
	let comm = await Comm.findById(req.params.id);

	if (!comm) {
		return next(new ErrorResponse(`Comm not found with id of ${req.params.id}`, 404));
	}

	comm = await Comm.findByIdAndUpdate(req.params.id, req.body, {
		 new: true,
		 runValidators: true
		 });

  	res.status(200).json({ success: true, data: comm });
});

// @desc Delete a comm
// @desc Delete /api/v1/comm/:id
// @access Private
exports.deleteComm = asyncHandler( async (req, res, next) => {
	const comm = await Comm.findById(req.params.id);

	if(!comm) {
		return next(new ErrorResponse(`Comm not found with id of ${req.params.id}`, 404));
	}

	await comm.remove();// will trigger middleware to delete comms

	res.status(200).json({
		success: true,
		msg: "Deleted Comm"
	});
});