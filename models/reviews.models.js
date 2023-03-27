const db = require("../db/connection");

exports.fetchReviewById = (reviewId) => {
  const queryStr = `
  SELECT * FROM reviews
  WHERE review_id = $1
  `;

  return db.query(queryStr, [reviewId]).then((queryResponse) => {
    const fetchedReview = queryResponse.rows[0];

    return fetchedReview;
  });
};
