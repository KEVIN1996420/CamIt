/* jshint esversion : 9 */
// MODULES
const express = require('express');
// CONTOLLERS
// FUNCTIONS
const {
	getComms,
	// getAuthComms,
	// createComm,
	// updateComm,
	// deleteComm
    } = require('../controllers/comm');

// child router of auth
const router = express.Router({ mergerParams: true });

router.route('/').get(getComms);

module.exports = router;