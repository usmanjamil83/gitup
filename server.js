// gitup server setup
var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var passport = require('passport');
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 443;

var io = require('socket.io').listen(app.listen(PORT));
app.use(express.static(process.cwd() + "/public"));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force:true}).then(function() {
	console.log("App listening on PORT " + PORT);
});
