const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const {
  getReviews,
  getReviewById,
  getReviewComments,
} = require("./controllers/reviews.controllers");
const {
  handleCustomErrors,
  handleOtherErrors,
} = require("./controllers/errors.controllers");

const app = express();

app.get("/api", (req, res) => {
  res.status(200).send({ msg: "Welcome to the Board Game Reviews API" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews/:review_id/comments", getReviewComments);

// handle all 404 errors
app.use("*", (req, res) => {
  res.status(404).send({
    msg: "Nothing here. Check your spelling and try again.",
  });
});

app.use(handleCustomErrors);
app.use(handleOtherErrors);

module.exports = app;
