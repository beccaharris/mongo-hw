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

// Index (home) //
router.get('/', function(req, res) {
  res.render('index');
});

// Scrape NYT //
router.get('/scrape', function(req, res) {
  request('http://www.nytimes.com', function(err, res, html) {
    var $ = cheerio.load(html);
    $('article').each(function(i, element) {
      var result = {} 
      result.title = $(this).children('.story-heading').text();
      result.summary = $(this).children('.summary').text();
      result.link = $(this).children('.story-heading').children('a').attr('href');

      // Create new article object & save to db //
      var entry = new db.Article(result);
      entry.save(function(err, doc) {
        if (err) {
          console.log(err)
        } else {
          console.log(doc)
        }
      });
    });
  });
});

// Export routes for server.js
module.exports = router;