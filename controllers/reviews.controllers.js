const { fetchReviewById } = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const reviewId = req.params["review_id"];

  fetchReviewById(reviewId)
    .then((fetchedReview) => {
      if (fetchedReview !== undefined) {
        res.status(200).send({ review: fetchedReview });
      } else {
        res.status(404).send({
          msg: "We couldn't find any reviews with that ID. Check your request and try again.",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
