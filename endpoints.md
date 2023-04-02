# Board Game Reviews

## Available endpoints

### GET `/`

Currently, this endpoint welcomes you to the API. This will change once I build and implement the frontend.

### GET `/api`

This endpoint describes:
- all of the available endpoints,
- their available queries and options,
- example requests, and
- example responses.

### GET `/api/reviews`

This endpoint will show you all of the reviews in the database.

#### Queries

> Example of a complete query using all available options:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews?category=strategy&sort_by=review_id&order=asc
>```

##### Filters

You can filter the reviews by category.

> Example URL:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews?category=strategy
>```

There are currently 7 categories in the database:
- strategy
- hidden-roles
- dexterity
- push-your-luck
- roll-and-write
- deck-building
- engine-building

##### Sorting

Here's a table describing the different `sort_by` options:

| `sort_by` | Description |
| --- | --- |
| owner | The author of the review |
| title | The title of the review |
| review_id | The review's ID |
| category | The category the review belongs to |
| review_img_url | The url of the review's image |
| created_at | When the review was posted |
| votes | The total number of votes |
| designer | The name of the game's designer |
| comment_count | The total number of comments for that review |

> Example URL:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews?sort_by=review_id
>```

##### Order

You can also choose if you want the reviews sorted in ascending or descending order, by using `order=asc` or `order=desc`, respectively.

> Example URL:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews?sort_by=review_id&order=asc
>```

##### Defaults

If you don't specify a `sort_by` value, the reviews will appear sorted by date (`created_at`).

And if you don't specify an `order` value, the API will order them in descending order.

### GET `/api/reviews/:review_id`

This endpoint will fetch a review by its review ID.

> Example URL:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews/1
>```

### GET `/api/reviews/:review_id/comments`

This endpoint will fetch all comments for a specific review by its review ID.

> Example URL:
>
> ```
>https://board-game-reviews.up.railway.app/api/reviews/1/comments
>```

### PATCH `/api/reviews/:review_id`

To update a review's votes, use this endpoint with the `PATCH` method.

It requires an object like this one:

```json
{
  "inc_votes": "1"
}
```

To increment the review's votes, assign a positive number to `inc_votes`. To decrement them, use a negative number.

### POST `/api/reviews/:review_id/comments`

To post a new comment, use this endpoint with the `POST` method.

It requires an object like this one:

```json
{
  "username": "grumpy19",
  "body": "Loved this review!"
}
```

### DELETE `/api/comments/comment_id`

This endpoint lets you to delete a comment by its comment ID, using the `DELETE` method.
