"use strict";
//
const express = require("express");
const router = express.Router();

module.exports = knex => {
  // router.post("/", (req, res) => {
  //   let taskName = req.body.newItem;
  //   let endDate = req.body.dueDate;
  //   let newStatus = false;

  //   console.log(taskName, endDate);
  //   endDate = new Date(req.body.dueDate);
  //   let firstWordinTaskName = taskName.split(" ")[0];
  //   knex("keyword")
  //     .select("*")
  //     .where({ name: firstWordinTaskName })
  //     .then(keywords => {
  //       if (keywords.length === 0  && endDate === null) {
  //         console.log("check one");
  //         knex("item")
  //           .insert({
  //             name: taskName,
  //             status: newStatus,
  //             users_id: req.session.user_id,
  //             category_id: 5
  //           })
  //           .then(() => {
  //             res.redirect("/");
  //           });
          
  //       } else if(keywords.length === 0 ){
  //         console.log("check one");
  //         knex("item")
  //           .insert({
  //             name: taskName,
  //             due_date: endDate,
  //             status: newStatus,
  //             users_id: req.session.user_id,
  //             category_id: 5
  //           })
  //           .then(() => {
  //             res.redirect("/");
  //           });

  //       }else if(endDate === ""){
  //         knex("item")
  //           .insert({
  //             name: taskName,
  //             status: newStatus,
  //             users_id: req.session.user_id,
  //             category_id: keywords[0].category_id
  //           })
  //           .then(() => {
  //             res.redirect("/");
  //           });
  //         }else{
  //           knex("item")
  //           .insert({
  //             name: taskName,
  //             due_date: endDate,
  //             status: newStatus,
  //             users_id: req.session.user_id,
  //             category_id: keywords[0].category_id
  //           })
  //           .then(() => {
  //             res.redirect("/");
  //           });
  //         }
      
  //     });
  // });

  // POST task to item table
  // to do: due date cannot be before current date
  // get session id and add inside insert
  router.post("/", (req, res) => {
    let taskName = req.body.newItem;
    let endDate = req.body.dueDate;
    let newStatus = false;

    console.log(taskName, endDate);
    endDate = new Date(req.body.dueDate);
    let firstWordinTaskName = taskName.split(" ")[0];
    knex("keyword")
      .select("*")
      .where({ name: firstWordinTaskName })
      .then(keywords => {
        if (keywords.length === 0) {
          console.log("check one");
          knex("item")
            .insert({
              name: taskName,
              due_date: endDate,
              status: newStatus,
              users_id: req.session.user_id,
              category_id: 5
            })
            .then(() => {
              res.redirect("/");
            });
        } else {
          knex("item")
            .insert({
              name: taskName,
              due_date: endDate,
              status: newStatus,
              users_id: req.session.user_id,
              category_id: keywords[0].category_id
            })
            .then(() => {
              res.redirect("/");
            });
          console.log("did not");
        }
      });
  });


  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("item")
      .then(results => {
        res.json(results);
      });
  });

  router.post("/delete", (req, res) => {
    let newId = req.body.id;
    console.log(newId)
    knex("item")
      .where({name: newId})
      .del()
      .then(() => {
        res.send({ result: true });   
      });
  });
  return router;
};
