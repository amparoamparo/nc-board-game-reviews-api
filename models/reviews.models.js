const db = require("../db/connection");

exports.fetchReviews = (category, sortBy, order) => {
  // check if sort_by value is valid
  const validSortColumns = [
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "created_at",
    "votes",
    "designer",
    "comment_count",
  ];

  if (sortBy && !validSortColumns.includes(sortBy)) {
    return Promise.reject({
      status: 400,
      msg: "That's not a valid sort query parameter. Try one of these instead: 'owner', 'title', 'review_id', 'category', 'review_img_url', 'created_at', 'votes', 'designer', or 'comment_count'. If you don't include a sort parameter, we'll sort them by date.",
    });
  }

  // check if order input is valid
  const validOrderOptions = ["asc", "desc"];

  if (order && !validOrderOptions.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "That's not a valid order query parameter. To sort the reviews in ascending order, try 'asc'. Otherwise, we'll sort them in descending order by default.",
    });
  }

  let queryStr = `
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
  `;

  const queryParameters = [];

  // filter by category
  if (category) {
    queryStr += ` WHERE reviews.category = $1`;
    queryParameters.push(category);
  }

  queryStr += ` GROUP BY reviews.review_id`;

  // sort
  if (!sortBy) {
    queryStr += ` ORDER BY reviews.created_at`;
  } else if (sortBy === "comment_count") {
    queryStr += ` ORDER BY ${sortBy}`;
  } else {
    queryStr += ` ORDER BY reviews.${sortBy}`;
  }

  // order
  if (order === "asc") {
    queryStr += ` ASC`;
  } else {
    queryStr += ` DESC`;
  }

  return db.query(queryStr, queryParameters).then((queryResult) => {
    const fetchedReviews = queryResult.rows;

    if (!fetchedReviews.length) {
      return Promise.reject({
        status: 404,
        msg: "Either that category doesn't exist, or we couldn't find any reviews in that category. Check your request and try again.",
      });
    }

    return fetchedReviews;
  });
};

exports.fetchReviewsByCategory = (category) => {
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
      reviews.review_id = comments.review_id
    WHERE
      reviews.category = $1
    GROUP BY
      reviews.review_id
    ORDER BY
      reviews.created_at DESC;
  `;

  return db.query(queryStr, [category]).then((queryResult) => {
    const fetchedReviews = queryResult.rows;

    if (fetchedReviews.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "We either don't have any reviews in that category, or the category doesn't exist. Check your spelling and try again, or try a different category.",
      });
    }
    return fetchedReviews;
  });
};

exports.fetchReviewById = (reviewId) => {
  const queryStr = `
  SELECT
    reviews.*,
    Count(comments.review_id) as comment_count
  FROM
    reviews
  LEFT JOIN
    comments
  ON
    reviews.review_id = comments.review_id
  WHERE
    reviews.review_id = $1
  GROUP BY
    reviews.review_id
  ORDER BY
    reviews.created_at DESC;
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