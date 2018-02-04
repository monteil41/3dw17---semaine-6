'use strict';

const mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseyear: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

GameSchema.pre('save', function(next) {
    if (!this.createdOn) {
        this.createdOn = new Date();
    }
    next();
});

GameSchema.pre('validate', function(next) {
    if (this.isModified('createdOn')) {
        this.invalidate('createdOn');
    }
    next();
});

module.exports = mongoose.model('Games', GameSchema);