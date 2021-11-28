/* jshint esversion: 9 */
// const asyncHandler = require('../middleware/async');
// const User = require('../models/User');

const axios = require('axios');

// @desc Get current weather data
// @desc GET /api/v1/views/apis
// @access Public
exports.getAPIs = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: "Show all APIs",
	});
};

exports.getWeather = async () => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API}&query=Siem Reap&units=m`;
	const config = await axios({
	    method: 'get',
	    url: url
	});

	const resData = config.data;
	const data = 
		resData.current.weather_descriptions[0] +
		". It is currently " + resData.current.temperature +" degress out. " + 
		"Local time is " + resData.location.localtime.split(" ")[1] + ". " + 
		"The chance of rain is " + resData.current.temperature + "%. " +
		"It feels like " + resData.current.feelslike + " degress out. " + 
		"The humidity is " + resData.current.humidity + "%.";

	console.log(data);
	return data;
};


// exports.getHome = (req, res, next) => {
// 	res.status(200)
// 	.send('<h1>Home</h1>');
//       };
