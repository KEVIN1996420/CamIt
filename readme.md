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
<!-- --- CRUD --- -->
* make export function async and wrap with catchasync and await data coming back
* send the response status with the data
* catch any errors there might be
* set postman preset header to application/json and send data in body as json format
* create json object following auth model
* in server.js app.use express.json and set limit
* first see if you can console log the req.body then proceed
* post - wrap async and var = await model.create req.body
* get all - wrap async and var = await model.find (.select the object fields)
* get single - wrap async and var = await model.findById(req.params.id) (.select the object fields)
* update single - wrap async and var = await model.findByIdAndUpdate(req.params.id, req.body, new and run validators).
* delete single - wrap async and var = await model.findByIdAndDelete(req.params.id)
* add count to json response users.length

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

Postman POST req:
* header to application/json
* add form data in body as object

Setup views route controllers:
* require and mount route
* setup get req in controller 
* export router in routes file

Serve static files/folders
* require path at very top
* app.use(express.static(path.join(__dirname, 'public')));
* choose which templating engine (pug, ejs, handlebars)
* app.set view engine pug or ejs or handlebars
* create views folder in root of directory
* app.set views to views folder in dir
* to res.render(filename, {title data})


WeatherStack API: 
* Add ApiKey in configs
* Connect to get req using axios or request package
* only get req to get data from weather stack

MapBox API:
* Get api key from website
* save it in configs
* save mapbox url in var
* use axios to send get req
* return coordinates from address
<!-- Combine MapBox coordinates into Weatherstack for weather data -->

