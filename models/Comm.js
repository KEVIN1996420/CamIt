/* jshint esversion : 9 */
const mongoose = require('mongoose');
const validator = require('validator');

// Comm are different goods and services
// the comm will be one of the goods/services the user offers
const CommSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, `Title is required`],
		trim: true,
		minlength: 3,
		maxlength: 30,
	},
	category: {
		type: String,
		required: [true, `Category is required`],
		enum: ['goods', 'services'],
	},
	description: {
		type: String,
		required: [true, `Description is required`],
		trim: true,
		minlength: 3,
		maxlength: 300,
	},
	// priceAvg: {
	// 	type: Number,
	// 	required: [true, `Price is required`],
	// 	trim: true,
	// 	min: 0,
	// 	max: 1000000,
	// },
	currency: {
		type: String,
		required: [true, `Currency is required`],
		enum: ['EUR', 'USD', 'GBP', 'ZAR'],
	},
	auth: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Auth',
		required: [true, `Auth is required`],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
}, {
	timestamps: true,
}, {
	toJSON: { virtuals: true},
	toObject: { virtuals: true }	
});

module.exports = mongoose.model('Comm', CommSchema);
