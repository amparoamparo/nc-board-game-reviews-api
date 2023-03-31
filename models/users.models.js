const db = require("../db/connection");

exports.fetchAllUsers = () => {
  const queryStr = `
  SELECT * FROM users
  `;

  return db.query(queryStr).then((queryResult) => {
    const allUsers = queryResult.rows;

    return allUsers;
  });
};
