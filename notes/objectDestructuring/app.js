/* jshint esversion: 9 */

// create transaction object
const transaction = {
	  type: 'deposit',
	  amount: 100,
	  method: 'cash'
	};

// create user object
const user = {
	name: "john",
	email: "john@gmail.com",
	id: "dvkjb38g4rvev"
};

// ------------
// create function that destructures object and returns type, amount, and method
const trans = ({ type, amount, method }) => {
	console.log(type, amount, method);
};

const use = ({ name, email, id }) => {
	console.log(name, email, id);
};
// call function with object to destructure
trans(transaction);
use(user);

// --------
const { type, amount, method} = transaction;
console.log(type);
const { name, email, id } = user;
console.log(name);

// -------------------------------------------
// default function parameters
// function that destructures object and logs given properties 
const greet = ({name, greeting = "Hello", emailBody = "Welcome to CamIt."}) => {
	console.log(`${greeting} ${name}. ${emailBody}`);
};
// call function with object to destructure
greet(user);