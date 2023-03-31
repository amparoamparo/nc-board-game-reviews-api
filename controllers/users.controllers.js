const { fetchAllUsers } = require("../models/users.models");

exports.getUsers = (req, res, err) => {
  fetchAllUsers()
    .then((allUsers) => {
      res.status(200).send({ users: allUsers });
    })
    .catch((err) => {
      next(err);
    });
};
