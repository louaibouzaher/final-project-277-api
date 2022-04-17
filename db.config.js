var mysql = require("mysql");
require("dotenv/config");

const connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = connection;
