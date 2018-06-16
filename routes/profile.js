"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.post("/", (req, res) => {
    const user = req.session.id;
    const pw = req.body.newpassword;

    knex("users")
      .where({id: req.session.user_id})
      .update({
        password: pw
      })
      .then(count => {
        console.log(count)
        res.redirect("/");
      });
  });
  return router;
};
