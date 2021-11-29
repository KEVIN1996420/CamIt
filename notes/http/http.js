/* jshint esversion: 9 */
const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=f8e0c31c130ec8f12f906382852fc7ad&query=Siem Reap&units=m`;

const request = http.get(url, (response) => {
	let data = '';

	response.on('data', (chunk) => { 
		data += chunk;
	});

	response.on('end', () => {
		const body = JSON.parse(data);// parse data to json
		console.log(body);
	});
});

request.on('error', (error) => {
	console.log('An error occured', error);
});

request.end();

// we like to use axios to send our requests