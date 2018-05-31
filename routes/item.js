"use strict";
//
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

//POST task to item table
//to do: due date cannot be before current date
  router.post("/", (req, res) => {
    let taskName = req.body.newItem;
    let endDate = req.body.dueDate;
    let newStatus = false;

console.log(taskName, endDate);
    endDate = new Date (req.body.dueDate);
    let firstWordinTaskName = taskName.split(' ')[0];
    knex("keyword")
    .select("*")
    .where({name: firstWordinTaskName})
    .then((keywords) => {
      console.log('logging keywords', keywords)
      if (keywords.length === 0) {
        console.log('check one')
        knex("item")
          .insert({name: taskName, due_date: endDate, status: newStatus, category_id: 5})
          .then(() => {

          })
        } else {
          knex("item")
          .insert({name: taskName, due_date: endDate, status: newStatus, category_id: keywords[0].category_id})
          .then(() => {

          })
          console.log('did not')
        }
      });


        //display in html
      // .catch((err) => {
      //   res.sendStatus(500)
      // });
  });
  return router;
}