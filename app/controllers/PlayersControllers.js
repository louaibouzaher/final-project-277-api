// const Player = require("../models/PlayerModel");
const db = require("../../db.config");
exports.getAllPlayers = async (req, res) => {
  try {
    await db.query("select * from playersinteam ", (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      }
      res.send(results);
      return;
    });
  } catch (err) {
    res.send(err);
  }
};
exports.getFilteredPlayers = async (req, res) => {
  try {
    const filters = Object.keys(req.body)
      .map((key) => `${key} = "${req.body[key]}"`)
      .join(" AND ");
    console.log(filters);
    const q =
      `select * from playersinteam ` +
      (filters.length > 1 ? `where ${filters}` : "");
    console.log(q);
    await db.query(q, (error, results, fields) => {
      if (error) {
        res.send(error);
        return;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send({ error: err, data: [] });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = req.body;
    const q = `CALL addPlayer("${player.firstName}",
    "${player.lastName}", 
     "${player.picture}",
      '${player.birthdate}',"${player.nationality}",
        "${player.currentClub}", 
        "${player.nationTeam}",
         ${player.shirtNumber},
         "${player.position}", 
          ${player.numberOfGoals},
          ${player.numberOfTrophies},
           ${player.numberOfAssists});`;

    await db.query(q, (error, results, fields) => {
      if (error) {
        res.send(error).sendStatus(400);
        return;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const player = req.body;
    console.log("player: " + JSON.stringify(player));
    const q = `CALL editPlayer(${player.id},"${player.firstName}",
    "${player.lastName}", 
     "${player.picture}",
      '${player.birthDate}',"${player.nationality}",
        "${player.currentClub}", 
        "${player.nationTeam}",
         ${player.shirtNumber},
         "${player.position}", 
          ${player.numberOfGoals},
          ${player.numberOfTrophies},
           ${player.numberOfAssists});`;

    await db.query(q, (error, results, fields) => {
      if (error) {
        res.send(error).sendStatus(400);
        return;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await db.query(
      `delete from people where ID = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          res.send(error);
        }
        console.log(results);
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};
