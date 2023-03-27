const app = require("../app");

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res
      .status(400)
      .send({ msg: "Nothing to see here. Check your request and try again." });
  } else {
    next(err);
  }
};

exports.handleOtherErrors = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};
