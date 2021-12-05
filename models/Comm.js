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
	price: {
		type: Number,
		required: [true, `Price is required`],
		trim: true,
		min: 0,
		max: 1000000,
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

// static method to get avg of comm price
CommSchema.statics.getAvgCost = async function(authId) {
	const obj = await this.aggregate([
		{
			$match: { auth: authId}
		},
		{
			$group: {
				_id: '$auth',
				avgCost: { $avg: '$price' }
			}
		}
	]);
	// console.log(obj);
	try{
		await this.model('Auth').findByIdAndUpdate(authId, { avgCost: Math.ceil(obj[0].avgCost / 10 ) * 10 });
	} catch(err) {
		console.log(err);
	}
};


// call avgCost after save
CommSchema.post('save', function() {
	this.constructor.getAvgCost(this.auth);
});

// call avgCost before remove
CommSchema.pre('remove', function() {
	this.constructor.getAvgCost(this.auth);
});

module.exports = mongoose.model('Comm', CommSchema);
