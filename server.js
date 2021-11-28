/* jshint  esversion: 9 */

// require npm modules
// const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

// require files
const connectDB = require('./configs/db');

// import routes from routes folder
const auth = require("./routes/auth");

// initialize express server
const app = express();

// body parser
app.use(express.json());

// read env vars from configs file
dotenv.config({ path: './configs/config.env' });

// connect database
connectDB();

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
const server = app.listen(
	port,
	console.log(`Server listening in ${process.env.NODE_ENV} on port ${port}`.green.bold.underline));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.bgGreen);
	server.close(() => process.exit(1));
});
