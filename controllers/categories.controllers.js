const { fetchAllCategories } = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
  fetchAllCategories()
    .then((allCategories) => {
      res.status(200).send({ categories: allCategories });
    })
    .catch((err) => {
      next(err);
    });
};
