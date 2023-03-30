const app = require("../app");

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({
      // request not valid
      msg: "Something's not quite right with your request. Check your spelling and try again.",
    });
  } else if (err.code === "22003" && req.path.includes("review")) {
    // number too big
    res.status(404).send({
      msg: "We couldn't find any reviews with that ID. Check your request and try again.",
    });
  } else if (err.code === "22003" && req.path.includes("comment")) {
    // number too big
    res.status(404).send({
      msg: "We couldn't find any comments with that ID. Check your request and try again.",
    });
  } else if (
    err.code === "23503" &&
    req.path.includes("review") &&
    err.detail.includes("review_id")
  ) {
    // wrong review id
    res.status(404).send({
      msg: "We couldn't find any reviews with that ID. Check your request and try again.",
    });
  } else if (
    err.code === "23503" &&
    req.path.includes("review") &&
    err.detail.includes("author")
  ) {
    // wrong username
    res.status(404).send({
      msg: "We couldn't find any users with that username. Check your request and try again.",
    });
  } else if (err.code === "23502") {
    // missing required data
    res.status(400).send({
      msg: "There seems to be some data missing. Check your request and try again.",
    });
  } else {
    next(err);
  }
};

exports.handleOtherErrors = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ msg: err.msg || "Something went wrong. Try again later." });
};
