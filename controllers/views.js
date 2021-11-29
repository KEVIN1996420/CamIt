/* jshint esversion: 9 */
// const asyncHandler = require('../middleware/async');
// const User = require('../models/User');

const axios = require('axios');

// @desc Get all apis
// @desc GET /api/v1/views/apis
// @access Public
// exports.getAPIs = (req, res, next) => {
// 	res.status(200).json({
// 		success: true,
// 		msg: "Show all APIs",
// 	});
// };

// @desc Get current weather data
// @desc GET /api/v1/views/weather
// @access Public
// exports.getWeather = async (req, res, next) => {
// 	try{
// 		const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API}&query=Siem Reap&units=m`;
// 		const config = await axios.get(url);
// 		const resData = config.data;
// 		const data = 
// 			resData.current.weather_descriptions[0] +
// 			". It is currently " + resData.current.temperature +" degress out. " + 
// 			"Local time is " + resData.location.localtime.split(" ")[1] + ". " + 
// 			"The chance of rain is " + resData.current.temperature + "%. " +
// 			"It feels like " + resData.current.feelslike + " degress out. " + 
// 			"The humidity is " + resData.current.humidity + "%.";

// 		// console.log(data);
// 		// return data;
// 		res.status(200).json({
// 			success: true,
// 			msg: "Show weather",
// 			data: data
// 		});
// 	}catch(err){
// 		console.log(err);
// 		res.status(500).json({
// 			success: false,
// 			msg: "Error"
// 		});
// 	}
	
// };

// exports.getMapBox = async (req, res, next) => {
// 	try{
// 		const city = "Siem Reap";
// 		const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?limit=1&access_token=${process.env.MAPBOX_API_KEY}`;
// 		const config = await axios.get(mapboxURL);
// 		const resData = config.data.features[0];
// 		const lat = resData.center[1]; // lat comes from second coordinate
// 		const long = resData.center[0];

// 		console.log(lat, long);

// 		res.status(200).json({
// 			success: true,
// 			msg: "Show weather",
// 			// data: data
// 		});
// 	}catch(err){
// 		console.log(err);
// 		res.status(500).json({
// 			success: false,
// 			msg: "Error"
// 		});
// 	}	
// };

exports.getMapBoxWeather = async (req, res, next) => {
	try{	
		// replace with req.params.address
		const { address } = req.params;
		if(!address){
			return res.status(400).json({
				success: false,
				msg: "No address provided"
			});
		}
		// store urls
		const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=${process.env.MAPBOX_API_KEY}`;
		
		const request1 = await axios.get(mapboxURL);
		const { center } = request1.data.features[0];
		const latLong = `${center[1]} ${center[0]}`; // lat comes from second coordinate

		const weatherURL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API}&query=${encodeURIComponent(latLong)}&units=m`;
		const request2 = await axios.get(weatherURL);
		const { current, location } = request2.data;

		const data = 
			current.weather_descriptions[0] +
			". It is currently " + current.temperature +" degress out. " + 
			"Local time is " + location.localtime.split(" ")[1] + ". " + 
			"The chance of rain is " + current.temperature + "%. " +
			"It feels like " + current.feelslike + " degress out. " + 
			"The humidity is " + current.humidity + "%.";

		// console.log(data);
		// res.status(200).json({
		// 	success: true,
		// 	msg: "Address to MapBox coordinates to WeatherStack Data",
		// 	data
		// });
		res.render('mapbox-weather', {
			title: 'MapBox Weather API',
			data
		});
	}catch(err){
		console.log(err.message);
		if (err.message === "Cannot read property 'center' of undefined") {
			res.status(404).json({
				success: false,
				msg: "Unable to find that location."
			});
		}else{
			res.status(500).json({
				success: false,
				msg: "Unable to connect to location and weather services."
			});
		}
		
	}		
};