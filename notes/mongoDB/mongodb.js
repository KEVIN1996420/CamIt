/* jshint esversion: 9 */
// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    
    // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    	db.collection('users').findById('5c1113239cbfe605241f9071', (error, user) => {
		if (error) {
			return console.log('Unable to fetch');
		}
		console.log(user);
	});
	    			
	db.collection('tasks').findOne("5c1113239cbfe605241f9071", (error, task) => {
        	console.log(task);
    	});

	db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
		console.log(tasks);
	});
});

// updating
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     const db = client.db(databaseName)
    
//     // db.collection('users').updateOne({
//     //     _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
//     // }, {
//     //     $inc: {
//     //         age: 1
//     //     }
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('tasks').updateMany({
//         completed: false
//     }, {
//         $set: {
//             completed: true
//         }
//     }).then((result) => {
//         console.log(result.modifiedCount)
//     }).catch((error) => {
//         console.log(error)
//     })
// })

// deleting
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     const db = client.db(databaseName)
    
//     // db.collection('users').deleteMany({
//     //     age: 27
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('tasks').deleteOne({
//         description: "Clean the house"
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
// })