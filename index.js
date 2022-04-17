const express = require("express");
const app = express();
var mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const playersRoutes = require("./app/routes/PlayersRoutes");
require("dotenv/config");

const githubRepoUrl = "https://github.com/louaibouzaher/final-project-277-api/";

var connection = mysql.createConnection({
  host: "localhost",
  user: "me",
  password: "secret",
  database: "my_db",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

app.use(cors());

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(
    `<h1> Welcome to CSE Flutter Workshop API</h1> \
    For more info <a href=${githubRepoUrl} target='_blank'> Click Here </a>`
  );
});
app.use("/players", playersRoutes);

mongoose.connect(
  process.env.CONNECT_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB");
  }
);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

connection.end();
