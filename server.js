// Dependencies //
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose');

// Scraping tools //
var request = require('request'),
    cheerio = require('cheerio'); 

// Set port & initialize express //
var PORT = process.env.PORT || 3000;
var app = express();

// Configure middleware //
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Handlebars //
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongo-hw";
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Import routes //
var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(PORT, function() {
  console.log(`App running on port: ${PORT}`)
}) 