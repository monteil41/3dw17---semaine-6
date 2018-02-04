const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gametracker');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/user-routes');
userRoutes(app);

app.listen(port);

console.log('UE3DW17 S5 API started on: ' + port);



const igdb = require('igdb-api-node').default;
const client = igdb("a433ad1ec27711443ca8dc984f3c45da");

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

//appIgdb.listen(3000, () => console.log('IGDB app listening on port 3000!'));
