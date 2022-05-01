// const coach = require("../models/coachModel");
const db = require("../../db.config");
exports.getAllCoaches = async (req, res) => {
  try {
    await db.query(`select * from all_coaches`, (error, results, fields) => {
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
exports.getFilteredCoaches = async (req, res) => {
  try {
    const filters = Object.keys(req.body)
      .map((key) => `${key} = "${req.body[key]}"`)
      .join(" AND ");
    console.log(filters);
    const q =
      `select * from all_coaches ` +
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

exports.createCoach = async (req, res) => {
  try {
    const coach = req.body;
    const q = `CALL addCoach("${coach.firstName}",
    "${coach.lastName}", 
     "${coach.picture}",
      '${coach.birthdate}',"${coach.nationality}",
        "${coach.teamName}");`;

    await db.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const coach = req.body;
    console.log("coach: " + JSON.stringify(coach));
    const q = `CALL editCoach(${coach.people_Id},"${coach.firstName}",
    "${coach.lastName}", 
     "${coach.picture}",
      '${coach.birthdate}',"${coach.nationality}",
        "${coach.teamName}");`;

    await db.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
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

exports.deleteCoach = async (req, res) => {
  try {
    await db.query(
      `delete from people where ID = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
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
