/*jshint esversion: 9 */

// @desc Custom dev logger
const logger = (req, res, next) => {
	console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next(); // in all middleware you need to call next
};

// use the custom logger middleware
// add this to server.js
// const logger = require('./middleware/customLogger');
// app.use(logger);

module.exports = logger;