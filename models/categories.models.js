const db = require("../db/connection");

exports.fetchCategories = () => {
  const queryStr = `SELECT * FROM categories`;

  return db.query(queryStr).then((categories) => {
    const allCategories = categories.rows;

    return allCategories;
  });
};
