"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/login", (req, res) => {
    knex("users")
    .select("*")
    .where({username: req.body.username})
    .then((row) => {
      if (row.user = req.body.username) {
        res.redirect("/");
      } else {
        res.render("login");
      }
    })
  });
  return router;
}

