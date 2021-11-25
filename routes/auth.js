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
} = require('../controllers/auth');

// create express router
const router = express.Router(); 

// set up express router to 
router.route('/')
	.get(getUsers)
	.post(addUser);

router.route('/:id')
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;