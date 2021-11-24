/* jshint  esversion: 9 */
const fs = require('fs');

// add this to app.js
// const items = require('./notes/fs/filesystem.js');
// fs add new item for notes/filesystem
// items.addItems("555", "500", "555one ");

// read/get from file system
const getItems = function () {
	 console.log("Here are your items");
};

// write to file system
const addItems = function ( name, price, description ) {
	const items = loadItems();

	const duplicateItems = items.filter(function (item) {
		return item.name === name;
	});

	if(duplicateItems.length === 0) {
		items.push({name: name, price: price, description: description});
		saveItems(items);
		console.log("New Item Added");
	}else{
		console.log("Item already exists");
	}
};

const saveItems = function(items) {
	fs.writeFileSync('notes/fs/item.json', JSON.stringify(items, null, 2));

};
const loadItems = function () {
	try {
		const jsonData = JSON.parse( fs.readFileSync('notes/fs/items.json').toString() );
		return jsonData;
	}
	catch (err) {
		return [];
	}
};


module.exports = { addItems, getItems };