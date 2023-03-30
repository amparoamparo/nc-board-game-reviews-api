const {
  fetchAllReviews,
  fetchReviewById,
  updateVotes,
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

exports.patchReviewVotes = (req, res, next) => {
  const reviewId = req.params["review_id"];
  const { inc_votes: increaseVotesBy } = req.body;

  updateVotes(reviewId, increaseVotesBy)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview: updatedReview });
    })
    .catch((err) => {
      next(err);
    });
};