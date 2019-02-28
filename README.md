# New York Times Scraper w/MongoDB
This app uses webscraping to grab article headings, summaries, and urls directly from the New York Times and pull them into the view within the app. It allows users to save articles and write (and access later) notes that are linked to the specific article. View the app in action here: <a href="https://aqueous-reef-83166.herokuapp.com/">Heroku</a>

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites
- Node 
- MongoDB 
- Clone repo to your computer.

### Installing
After cloning, simply run:
``` 
npm install
```
If you want to do it the hard way, here are the individual packages that need to be installed: 
```
npm install body-parser
npm install cheerio
npm install express
npm install express-handlebars
npm install mongoose
npm install morgan
npm install request
```
Once everything is installed, in your terminal, to run the app, use the command: 
```
node server.js
```
## Built With 
- <a href="https://nodejs.org/en/">Node</a>
- <a href="https://getbootstrap.com/">Bootstrap v4.1</a>
- <a href="http://jquery.com/">jQuery</a>
- <a href="https://handlebarsjs.com/">Handlebars</a>
- <a href="https://www.mongodb.com/">MongoDB</a>
- <a href="https://cheerio.js.org/">Cheerio</a>
- <a href="http://mongoosejs.com/">Mongoose</a>
- <a href="https://expressjs.com/">Express</a>
