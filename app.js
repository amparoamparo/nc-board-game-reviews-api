const express = require("express");
const cors = require("cors");
const { getCategories } = require("./controllers/categories.controllers");
const {
  getReviews,
  getReviewById,
  patchReviewVotes,
} = require("./controllers/reviews.controllers");
const {
  getReviewComments,
  postComment,
  deleteComment,
} = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  handleCustomErrors,
  handleOtherErrors,
} = require("./controllers/errors.controllers");
const endpoints = require("./endpoints.json");

const app = express();

app.use(cors());

app.use(express.json());

// home
app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Welcome to the Board Game Reviews API! To begin, go to '/api'.",
  });
});

// api
app.get("/api", (req, res) => {
  res.status(200).json(endpoints);
});

// categories
app.get("/api/categories", getCategories);

// reviews
app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.patch("/api/reviews/:review_id", patchReviewVotes);

// comments
app.get("/api/reviews/:review_id/comments", getReviewComments);

app.post("/api/reviews/:review_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

// users
app.get("/api/users", getUsers);

// handle all 404 errors
app.use("*", (req, res) => {
  res.status(404).send({
    msg: "Nothing here. Check your spelling and try again.",
  });
});

app.use(handleCustomErrors);
app.use(handleOtherErrors);

module.exports = app;
