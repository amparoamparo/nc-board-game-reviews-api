# Board Game Reviews

## What is "Board Game Reviews"?

It's a RESTful API that contains reviews for board games.

Currently, you can:
- filter reviews by category,
- sort them by any of their properties,
- upvote and downvote reviews, and
- post (and delete) comments.

To see all available endpoints and options, see [available endpoints](endpoints.md).

## Process, tools and tech stack

I built this as part of my time at [Northcoders](https://northcoders.com/), tracking progress with a Kanban board on Trello, and using:
- JavaScript
- Node.js
- Express
- PostgreSQL (and node-postgres)
- Jest (and supertest) for testing

Starter files and all data were provided by Northcoders.

## Live version

I hosted the API using [ElephantSQL](https://www.elephantsql.com/) and [render](https://render.com/).

Take a look at the [live version](https://board-game-reviews.up.railway.app).

## Available endpoints

For a quick description of all available endpoints, go to [/api](https://board-game-reviews.up.railway.app/api).

For a full, detailed explanation, see [available endpoints](endpoints.md).

---

## Setting up a local clone

To get started setting up a local clone, make sure to [fork](https://github.com/amparoamparo/northcoders-board-game-reviews/fork) and clone this repo first.

### Packages

Once you've forked this repo and cloned it, you will need to install all necessary packages, running `npm install`.

### Databases

To successfully connect to the databases locally,  you will need to create two `.env` files:

- `.env.test`
- `.env.development`

Into each file, add:

```js
PGDATABASE=<database_name_here>
```

and replace `<database_name_here>` with the correct database name — `nc_games_test` and `nc_games`, respectively.

### Testing

To run all the tests for the app, use:

```
npm t app
```

### Node version

I built this project using the latest [LTS version of Node.js](https://nodejs.org/en/download) (18.15.0), which includes NPM version 9.5.0.
