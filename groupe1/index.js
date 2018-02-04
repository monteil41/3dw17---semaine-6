const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/semaine5');
const igdb = require('igdb-api-node').default;
const client = igdb("07befb29daf56098649bd017a11547db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/user-routes');
userRoutes(app);

var gameRoutes = require('./api/routes/game-routes');
gameRoutes(app);

var reviewRoutes = require('./api/routes/review-routes');
reviewRoutes(app);

const igdb = require('igdb-api-node').default;
const client = igdb('6cd5825223df67536926a01417bd70ee');

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search/:text', (req, res) => {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.params.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  });
});

app.get('/game/:id', (req, res) => {
  return client.games({
      fields: '*',
      ids: [req.params.id]
  }).then(igdbResponse => {
    res.send(igdbResponse.body[0]);
  });
});

app.listen(port);

console.log('GameTracker REST API started on: ' + port);