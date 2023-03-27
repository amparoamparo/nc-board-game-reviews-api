# Northcoders - Board Game Reviews

## Setup

### Databases

To successfully connect to the databases locally, you will need to create two .env files:

- `.env.test`
- `.env.development`

Into each file, add:

```js
PGDATABASE=<database_name_here>
```

and replace `<database_name_here>` with the correct database name.

See [`/db/setup.sql`](../db/setup.sql) for the database names.

### Packages

Make sure to run `npm install` to install all the necessary packages.

You will also need to install **express** (`npm install express`) and **supertest** (`npm i -D supertest`).
