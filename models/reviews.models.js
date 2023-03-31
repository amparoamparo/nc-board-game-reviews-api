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

  return db.query(queryStr).then((queryResult) => {
    const allReviews = queryResult.rows;

    return allReviews;
  });
};

exports.fetchReviewById = (reviewId) => {
  const queryStr = `
  SELECT * FROM reviews
  WHERE review_id = $1
  `;

  return db.query(queryStr, [reviewId]).then((queryResult) => {
    const fetchedReview = queryResult.rows[0];

    if (fetchedReview === undefined) {
      return Promise.reject({
        status: 404,
        msg: "We couldn't find any reviews with that ID. Check your request and try again.",
      });
    }

    return fetchedReview;
  });
};

exports.updateVotes = (reviewId, increaseVotesBy) => {
  const queryStr = `
    UPDATE
      reviews
    SET
      votes = votes + $2
    WHERE
      review_id = $1

    RETURNING *;`;

  return db.query(queryStr, [reviewId, increaseVotesBy]).then((queryResult) => {
    const updatedReview = queryResult.rows[0];

    if (updatedReview === undefined) {
      return Promise.reject({
        status: 404,
        msg: "We couldn't find any reviews with that ID. Check your request and try again.",
      });
    }

    return updatedReview;
  });
};