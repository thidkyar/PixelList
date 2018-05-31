"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
var cookieParser = require('cookie-parser')


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//Cookie parser
app.use(cookieParser());

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/register", registerRoutes(knex))

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//login page
app.get("/login", (req, res) => {
  res.render("login");
})


//login post

//register page
app.get("/register", (req, res) => {
  res.render("register")
})

//register post
app.post("/register", (req, res) => {
  let userName = req.body.username;
  let pwd = req.body.password;
  knex("users")
      .insert({username: userName, password: pwd})
      .then((user) => {
        console.log("check this", user);
      });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
