Setup Express Server:
* npm i express
* create server.js
* require express
* initialise express
* setup port var in config
* npm i dotenv
* import config and path
* listen on port, add port var and log to console
* setup process on unhandled rejected requests
* log error msg
* close server and exit process (1)

Files & Folders:
* configs
* controllers
* middleware
* models
* public
* routes
* git ignore

Configs:
* NODE_ENV=development, PORT=???, APP_NAME=???, MONGO_URI=???


Auth:
* create files(routes/auth.js + controllers/auth.js + models/Auth.js)
* routes - require express
* setup express router
* setup router.route and /(get,post) + /:id(get,put,delete)
* controllers - require Auth model
* export functions that will be imported into auth routes
* require functions from controllers into routes
* add functions into routes
* in server.js, require routes and mount routes using path route folder
* in model - add geojson from address field
* add timestamp and tojson toobject virtuals true
* install slug and require in model
* create middleware that runs slug on save and update

Logging Middleware:
* Npm i morgan
* require morgan
* if node env is dev, use morgan

MongoDB:
* Create new project cluster
* whitelist ip address
* setup admin database access
* connect cluster to mongodb compass
* create db.js in configs
* install mongoose
* require mongoose in db.js
* connectDB async and connect var
* await mongoose connection on MONGOOSE_URI in configs
* No longer - useNewUrlParser, useCreateIndex, useFindAndModify, useUnifiedTopology
* console log connection status
* server.js - require db.js and connectDB under configs


