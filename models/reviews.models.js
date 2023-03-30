const db = require("../db/connection");

exports.fetchAllReviews = () => {
  const queryStr = `
    SELECT
      reviews.owner,
      reviews.title,
      reviews.review_id,
      reviews.category,
      reviews.review_img_url,
      reviews.created_at,
      reviews.votes,
      reviews.designer,
      Count(comments.review_id) as comment_count
    FROM
      reviews
    LEFT JOIN
      comments
    ON
      reviews.review_id=comments.review_id
    GROUP BY
      reviews.review_id
    ORDER BY
      reviews.created_at DESC;
  `;

  return db.query(queryStr).then((reviews) => {
    const allReviews = reviews.rows;

    return allReviews;
  });
};

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
