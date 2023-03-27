const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");

const app = express();

app.get("/api", (req, res) => {
  res.status(200).send({ msg: "Welcome to the Board Game Reviews API" });
});

app.get("/api/categories", getCategories);

app.all("*", (req, res) => {
  if (req.method === "GET") {
    res.status(404).send({
      msg: "Nothing to see here. Check your spelling and try again.",
    });
  }
});

module.exports = app;
