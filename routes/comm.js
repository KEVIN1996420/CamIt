/* jshint esversion : 9 */
// MODULES
const express = require('express');
// CONTOLLERS
// FUNCTIONS
const {
	getComms,
	getComm,
	addComm,
	updateComm,
	deleteComm
    } = require('../controllers/comm');

// child router of auth
const router = express.Router({ mergerParams: true });

router.route('/')
	.get(getComms);

router.route('/:id')
	.get(getComm)
	.post(addComm)
	.put(updateComm)
	.delete(deleteComm);

module.exports = router;