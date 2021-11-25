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

Logging Middleware:
* Npm i morgan
* require morgan
* if node env is dev, use morgan