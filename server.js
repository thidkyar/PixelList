"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session");


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register")
const itemRoutes = require("./routes/item");
// const itemgetRoute = require("./routes/item_get")

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
app.use(
  cookieSession({
    name: "session",
    keys: ["Dont worry how this is encrypted"]
  })
);

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/register", registerRoutes(knex));
app.use("/api/users/items", itemRoutes(knex));
// app.use("/api/users/items", itemgetRoute(knex));

// Home page
app.get("/", (req, res) => {
  let templateVars = {
    userName: req.session.id,
  };
  res.render("index", templateVars);
});

//login page
app.get("/login", (req, res) => {
  res.render("_login");
})

//register page
app.get("/register", (req, res) => {
  res.render("_register")
})

//logout button (delete cookies)
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

// Welcome page
app.get("/welcome", (req, res) => {
  res.render("welcome");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
