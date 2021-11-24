/* jshint  esversion: 9 */

// require npm modules
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// read env vars from configs file
dotenv.config({ path: './configs/config.env' });


const app = express();


// setup express server to serve static files	
app.use(express.static('public'));

// set up express get route to /
// app.get('/', (req, res) => {
// 	let city = "siem reap";
// 	let link = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;
// 	res.status(200)
// 	.json({
// 		success: true,
// 		message: link
// 	});
// 	// .redirect(`https://${link}`);
// });

// set up express get route to /
app.get('/', (req, res) => {
	res.send("This is the Home");
});

app.get('/register', (req, res) => {
	res.send("This is the Register");
});

app.get('/login', (req, res) => {
	res.send("This is the Login");
});

app.get('/me', (req, res) => {
	res.send("This is the User page");
});

// set up port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server listening in ${process.env.NODE_ENV} on port ${port}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(err.message);
	server.close(() => process.exit(1));
});
