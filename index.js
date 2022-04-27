const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
var readline = require("readline");

const app = express();

const playersRoutes = require("./app/routes/PlayersRoutes");
const teamsRoutes = require("./app/routes/TeamsRoutes");

const db = require("./db.config");

const githubRepoUrl = "https://github.com/louaibouzaher/final-project-277-api/";

db.connect();

db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
// db.query("CREATE SCHEMA Football", function (error, results, fields) {});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    `<h1>CMPS 277 Final Project Football Database API</h1> \
    For more info <a href=${githubRepoUrl} target='_blank'> Click Here </a>`
  );
});

app.use("/players", playersRoutes);
app.use("/teams", teamsRoutes);
app.use("/coaches", playersRoutes);
app.use("/leagues", playersRoutes);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

// db.end();
