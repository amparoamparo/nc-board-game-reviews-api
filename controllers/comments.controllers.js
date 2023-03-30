const {
  fetchReviewComments,
  createComment,
  removeComment,
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

exports.deleteComment = (req, res, next) => {
  const commentId = req.params["comment_id"];

  removeComment(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};