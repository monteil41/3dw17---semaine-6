'use strict';

module.exports = function(app) {
  var reviewCtrl = require('../controllers/review-controller');


  pp.route('/users/:userId/reviews')
    .get(reviewCtrl.findReviews);

  app.route('/users/:userId/game/:gameId/review')
    .get(reviewCtrl.findReview)
    .put(reviewCtrl.updateReview)
    .delete(reviewCtrl.removeReview)
    .post(reviewCtrl.createReview);
};
