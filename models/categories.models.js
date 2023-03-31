const db = require("../db/connection");

exports.fetchAllCategories = () => {
  const queryStr = `SELECT * FROM categories`;

  return db.query(queryStr).then((queryResult) => {
    const allCategories = queryResult.rows;

    return allCategories;
  });
};
