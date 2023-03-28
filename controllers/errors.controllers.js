const app = require("../app");

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({
      msg: "Something's not quite right with your request. Check your spelling and try again.",
    });
  }

  if (
    err.code === "22003" &&
    req.path.includes("review") &&
    req.method === "GET"
  ) {
    res.status(404).send({
      msg: "We couldn't find any reviews with that ID. Check your request and try again.",
    });
  } else {
    next(err);
  }
};

exports.handleOtherErrors = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};
