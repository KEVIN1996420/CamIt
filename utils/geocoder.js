/*jshint esversion: 9 */
const NodeGeocoder = require('node-geocoder');

const dotenv = require('dotenv');
dotenv.config({ path: './configs/config.env' });

const options = {
	provider: `mapquest`,
	httpAdapter: 'https',
	apiKey: `xeXJbM2HEEdMeH2psGRlWUgQRiKYMTEG`,
	formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;