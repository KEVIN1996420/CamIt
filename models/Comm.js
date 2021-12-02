/* jshint esversion : 9 */
const mongoose = require('mongoose');
const validator = require('validator');

const CommSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
		trim: true,
		enum: ['goods', 'services',],
	},
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 30,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 300,
	},
	price: {
		type: Number,
		required: true,
		trim: true,
		min: 0,
		max: 1000000,
	},
	currency: {
		type: String,
		required: true,
		trim: true,

	}
}, {
	timestamps: true,
});

