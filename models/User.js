/* jshint  esversion: 9 */
const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	last: {
		type: String,
		required: true,
	},
	password: {
		required: [true," Please add a password in the field"],
		minLength: 4,
		maxLength: 8,
		trim: true,
		type: String
	}
});

module.exports = mongoose.model('User',Userschema);