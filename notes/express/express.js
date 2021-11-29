/* jshint esversion: 9 */
// core node modules
const path = require('path');
// npm modules
const express = require('express');

const app = express();

// SET STATIC FOLDER
// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../../notes/express')));

// send get req to /
// http://localhost:3000
app.get('/', (req, res) => {
	    res.send('<h1>Hello Express!</h1>');
});

// send get req to weatherstack api
// http://localhost:3000/weatherstack
app.get('/weatherstack', (req, res) => {
	    res.send('Hello Weatherstack!');
});

const port = 3000;
app.listen(port, () => console.log(`Example Express app listening on port ${port}!`));
