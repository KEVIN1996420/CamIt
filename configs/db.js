/*jshint esversion: 8 */
const { red } = require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.red.underline.bgBrightCyan.bold);
};

module.exports = connectDB;
