// Dependencies //
var express  = require('express'),
    mongoose = require('mongoose'),
    router   = express.Router();

// Scraping tools //
var request  = require('request'),
    cheerio  = require('cheerio');

// Models folder //
var db = require('../models');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


router.get('/', function(req, res) {
  res.render('index');
});

// Export routes for server.js
module.exports = router;