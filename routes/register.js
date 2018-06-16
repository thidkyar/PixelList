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
          console.log('after select')
          if (result.length > 0) {
            res.send("Username already exists!")
          } else {
            console.log('after else')
          knex("users")
          .insert({username: userName, password: pwd})
          .returning('*')                 
          .then((result) => {
            console.log('did this get logged')   
            req.session.user_id = result[0].id
            req.session.user_name = result[0].username
            console.log(req.session.user_name);
            res.redirect("/");
          })
          }
        })
  });
  return router;
}