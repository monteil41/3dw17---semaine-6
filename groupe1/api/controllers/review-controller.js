'use strict';

const mongoose = require('mongoose');
const User = require('../models/review-schema');

exports.createReview = function(req, res) {
  var newUser = new User( {score:req.body.score,userId:req.params.userId,gameId:req.params.gameId} );
  newUser.save(function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({
        message: err.code === 11000 ? 'Review already exist' : 'Unable to create Review'
      });
    }
    res.json(user);
  });
};

exports.updateReview = function(req, res) {
  User.findOneAndUpdate({userId:req.params.userId}, {score:req.body.score}, {new: true}, function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to update Review' });
    }
    res.json(user);
  });
};

exports.findReviews = function(req, res) {
  User.find({userId: req.params.userId}, function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find Review '+req.params.userId });
    }
    res.json(user);
  });
};


exports.removeReview = function(req, res) {
  User.remove({
    userId: req.params.userId,
    gameId: req.params.gameId
  }, function(err, User) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to delete Review' });
    }
    res.json({ message: 'Review successfully deleted' });
  });
};


exports.findReview = function(req, res) {
    User.findOne(
      {
        userId:req.params.userId,
        gameId:req.params.gameId
      }, 
  function(err, game) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find game '+req.params.gameId+' for user '+req.params.userId });
    }
    res.json(game);
  });
};