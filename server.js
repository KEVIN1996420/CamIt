/* jshint  esversion: 9 */

// require npm modules
// const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


// import routes from routes folder
const auth = require("./routes/auth");

// initialize express server
const app = express();

// read env vars from configs file
dotenv.config({ path: './configs/config.env' });


// setup express server to serve static files	
// app.use(express.static('public'));

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// mount routes
app.use('/api/v1/auth', auth);


// set up port
const port = process.env.PORT || 3000;
app.listen(
	port,
	console.log(`Server listening in ${process.env.NODE_ENV} on port ${port}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(err.message);
	server.close(() => process.exit(1));
});
