'use strict';

module.exports = function(app) {
  var gameCtrl = require('../controllers/game-controller');

  app.route('/game')
    .get(gameCtrl.findGameByEmail)
    .post(gameCtrl.createGame);


  app.route('/game/:gameId')
    .get(gameCtrl.findGame)
    .put(gameCtrl.updateGame)
    .delete(gameCtrl.removeGame);
};
