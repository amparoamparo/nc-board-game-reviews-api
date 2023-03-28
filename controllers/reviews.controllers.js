const {
  fetchAllReviews,
  fetchReviewById,
} = require("../models/reviews.models");

exports.getReviews = (req, res, next) => {
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

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
