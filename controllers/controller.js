// Dependencies //
var express    = require('express'),
    router     = express.Router();

// Scraping tools //
var request = require('request'),
    cheerio = require('cheerio'); 

// Models //
var db = require('../models')

// Routes //
// index //
router.get('/', function(req, res) {
  res.redirect('/scrape');
});

// scrape //
router.get('/scrape', function(req, res) {
  request('http://www.nytimes.com/', function(error, response, html) {
    var $ = cheerio.load(html);
    var scrapedArticles = {};
    $('article').each(function(i, element) {
      var result = {};
      result.title = $(this).children('h2').text();
      result.link = $(this).children('h2').children('a').attr('href');
      result.summary = $(this).children('.summary').text();
      // Give summary a value if there isn't on provided //
      if (result.summary !== "") {
        result.summary = result.summary
      } else {
        result.summary = "Oh no! No summary was provided for this article."
      }
      scrapedArticles[i] = result;
      // save entry to mongodb //
      var entry = new db.Article (result);
      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
    });
    // pass articles to handlebars so they show in the view //
    var hbsArticleObject = {
      articles: scrapedArticles
    };
    res.render('index', hbsArticleObject);
  });
});

// get saved article //
router.get("/saved", function(req, res) {
  db.Article.find({"saved": true}).populate("notes").exec(function(error, articles) {
    var hbsObject = {
      article: articles
    };
    res.render("saved", hbsObject);
  });
});

// Export routes for server.js
module.exports = router;