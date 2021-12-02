/* jshint esversion : 9 */
// MODELS
const Comm = require('../models/Comm');
// UTILS
const ErrorResponse = require('../utils/errorResponse');
// const sendEmail = require('../utils/sendEmail');
// MIDDLEWARE
const asyncHandler = require('../middleware/async');

exports.getComms = asyncHandler(async (req, res, next) => {
	let query;
	
	if (req.params.authId) {
		query = Comm.find({ auth: req.params.authId });
	}else{
		query = Comm.find();
	}
	
	const comms = await query;

	res.status(200).json({
		success: true,
		count: comms.length,
		// data: comms
		comms: comms
	});
});

// exports.getComm = asyncHandler(async (req, res, next) => {
// 	const comm = await Comm.findById(req.params.id);

// 	if (!comm) {
// 		return next(new ErrorResponse(`Comm not found with id of ${req.params.id}`, 404));
// 	}

//   	res.status(200).json({ success: true, data: comm });
// });