const db = require("../db/connection");

exports.fetchCategories = () => {
  let queryStr = `SELECT * FROM categories`;

  return db.query(queryStr).then((categories) => {
    const allCategories = categories.rows;

    return allCategories;
  });
};
