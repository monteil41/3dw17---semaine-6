'use strict';

const igdb = require('igdb-api-node').default;
const client = igdb('a0cc1840c986948570d44ee089bc37f2');
const mongoose = require('mongoose');
const Game = require('../models/game-schema');

exports.createGame = function(req, res) {
  var newGame = new Game(req.body);
  newGame.save(function(err, game) {
    if (err)
    {
      console.error(err);
      res.json({
        message: err.code === 11000 ? 'Game already exist' : 'Unable to create game'
      });
    }
    res.json(game);
  });
};

exports.findGame = function(req, res) {
  Game.findById(req.params.gameId, function(err, game) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find game '+req.params.gameId });
    }
    res.json(game);
  });
};

exports.findGameByEmail = function(req, res) {
  Game.findOne({email: req.query.email}, function(err, game) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find game '+req.params.email });
    }
    res.json(game);
  });
};

exports.updateGame = function(req, res) {
  Game.findByIdAndUpdate(req.params.gameId, req.body, {new: true}, function(err, game) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to update game'});
    }
    res.json(game);
  });
};


exports.removeGame = function(req, res) {
  Game.remove({
    _id: req.params.gameId
  }, function(err, Game) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to delete game' });
    }
    res.json({ message: 'Game successfully deleted' });
  });
};
