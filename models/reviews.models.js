const db = require("../db/connection");

exports.fetchReviewById = (reviewId) => {
  const queryStr = `
  SELECT * FROM reviews
  WHERE review_id = $1
  `;

  return db.query(queryStr, [reviewId]).then((queryResponse) => {
    const fetchedReview = queryResponse.rows[0];

    if (fetchedReview === undefined) {
      return Promise.reject({
        status: 404,
        msg: "We couldn't find any reviews with that ID. Check your request and try again.",
      });
    }
    
    return fetchedReview;
  });
};
