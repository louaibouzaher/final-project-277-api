const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const playersRoutes = require("./app/routes/PlayersRoutes");

const db = require("./db.config");

const githubRepoUrl = "https://github.com/louaibouzaher/final-project-277-api/";

db.connect();

db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    `<h1> Welcome to CMPS 277 Final Project Football Database API</h1> \
    For more info <a href=${githubRepoUrl} target='_blank'> Click Here </a>`
  );
});

app.use("/players", playersRoutes);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

db.end();
