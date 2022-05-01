// const Referee = require("../models/RefereeModel");
const db = require("../../db.config");
exports.getAllReferees = async (req, res) => {
  try {
    await db.query(`select * from all_referees`, (error, results, fields) => {
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

exports.createReferee = async (req, res) => {
  try {
    const Referee = req.body;
    const q = `CALL addReferee("${Referee.refereeFirstName}",
    "${Referee.refereeLastName}", 
     "${Referee.refereePicture}",
      "${Referee.birthdate}","${Referee.refereeNationality}",
        ${Referee.refereeYearsOfExp});`;

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

exports.updateReferee = async (req, res) => {
  try {
    const Referee = req.body;

    const q = `CALL editReferee(${Referee.personId},"${Referee.refereeFirstName}",
    "${Referee.refereeLastName}", 
     "${Referee.refereePicture}",
      "${Referee.birthdate}","${Referee.refereeNationality}",
        ${Referee.refereeYearsOfExp});`;

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

exports.deleteReferee = async (req, res) => {
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
