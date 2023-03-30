const {
  fetchReviewComments,
  createComment,
} = require("../models/comments.models");

exports.getReviewComments = (req, res, next) => {
  const reviewId = req.params["review_id"];

  fetchReviewComments(reviewId)
    .then((reviewComments) => {
      res.status(200).send({ comments: reviewComments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const reviewId = req.params["review_id"];
  const { username: commentAuthor, body: commentContent } = req.body;

  createComment(reviewId, commentAuthor, commentContent)
    .then((postedComment) => {
      res.status(201).send({ postedComment: postedComment });
    })
    .catch((err) => {
      next(err);
    });
};
