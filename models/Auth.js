/* jshint  esversion: 9 */
// NODE PACKAGES
const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
// UTILS	
const geocoder = require('../utils/geocoder');

const AuthSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxLength: [20, 'Name must be less than 20 characters'],
		minLength: [2, 'Name must be more than 2 characters']
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid');
			}
		}
		// match: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
	},
	password: {
		required: [true," Please add a password in the field"],
		trim: true,
		type: String,
		// match: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
		maxLength: [20, 'Name must be less than 50 characters'],
		minLength: [8, 'Name must be more than 7 characters'],
		validate(value){
			if(value.toLowerCase().includes('password')){
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	active: {
		type: Boolean,
		default: true,
	},
	slug: String,
	// phoneNumber: {
	// 	type: Number,
	// 	maxLength: [20, 'Name must be less than 20 characters']
	// },
	address: {
		type: String,
		default: 'Siem Reap Cambodia'
	},
	// GEOJSON
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true
		      },
		      coordinates: {
			type: [Number],
			required: true,
			index: '2dsphere'
		      },
		      formattedAddress: String,
		      street: String,
		      city: String,
		      state: String,
		      zipcode: String,
		      country: String,
	},
	// averageRating: {
	// 	type: Number,
	// 	default: 1,
	// 	min: [1, 'Rating must be at least 1'],
	// 	max: [5, 'Rating must be at most 5']
	// },
	// photo: {
	// 	type: String,
	// 	default: 'default.jpg'
	// },
	// joinedAt: {
	// 	type: Date,
	// 	default: Date.now
	//     },

	// enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }
	// default:
	// select
	// validate:
	// lower/uppercase
	// trim
	// match
	// populate
	// min/max numbers
	// min/maxLength
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date
},{
	timestamps: true
}, {
	toJSON: { virtuals: true},
	toObject: { virtuals: true }	
});

// slugify name
AuthSchema.pre('save', function (next) {
	this.slug = slugify(this.name);
	next();
});

// GEOCODER
AuthSchema.pre('save', async function(next){
	const loc = await geocoder.geocode(this.address);
	this.location = {
	    type: 'Point',
	    coordinates: [ loc[0].longitude, loc[0].latitude ],
	    formattedAddress: loc[0].formattedAddress,
	    street: loc[0].streetName,
	    city: loc[0].city,
	    state: loc[0].stateCode,
	    zipcode: loc[0].zipcode,
	    country: loc[0].countryCode,
	};
	// Do not save address in DB
	this.address = undefined;
	next();
    });

// Cascade delete comms
AuthSchema.pre('remove', async function(next){
	console.log( 'Deleting all comms of ' + this.name );
	await this.model('Comm').deleteMany({ auth: this._id });
	next();
});



// Reverse populate with virtuals
AuthSchema.virtual('comms', {
	ref: 'Comm',
	localField: '_id',
	foreignField: 'auth',
	justOne: false
});

module.exports = mongoose.model('Auth', AuthSchema);