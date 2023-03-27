const { fetchReviewById } = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const reviewId = req.params["review_id"];

  fetchReviewById(reviewId)
    .then((fetchedReview) => {
      res.status(200).send({ review: fetchedReview });
    })
    .catch((err) => {
      next(err);
    });
};
