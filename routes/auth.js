/*jshint esversion: 9 */
// PACKAGES
const express = require('express');

// require controller middlewares
const { 
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getUsersInRadius
} = require('../controllers/auth');

// include other resource routers
const commRouter = require('./comm');

// create express router - parent router of comm
const router = express.Router(); 

// Re-route into other resource routers
router.use('/:authId/comm', commRouter);

// set up express router to 
router
    .route('/radius/:zipcode/:distance')
    .get(getUsersInRadius);

router.route('/')
	.get(getUsers)
	.post(addUser);

router.route('/:id')
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;