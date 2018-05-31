"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let userName = req.body.username;
    let pwd = req.body.password;
    knex("users")
        .select("*")
        .where({username: req.body.username})
        .then((result) => {
          if (result.length > 0) {
            res.send("Username already exists!")
          } else {
          knex("users")
          .insert({username: userName, password: pwd})
          .returning('*')
          .then((result) => {
            req.session.user_id = result[0].id
            req.session.user_name = result[0].username
            res.redirect("/");
          })
          }
        })
  });
  return router;
}