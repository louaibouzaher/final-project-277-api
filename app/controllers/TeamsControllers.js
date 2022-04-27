const db = require("../../db.config");
exports.getAllClubs = async (req, res) => {
  try {
    await db.query(
      "select * from team join club on team.ID = club.teamId",
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

exports.getAllNationalTeams = async (req, res) => {
  try {
    await db.query(
      "select * from team join nationalTeam on team.ID = nationalTeam.teamId",
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

exports.getFilteredClubs = async (req, res) => {
  try {
    const filters = req.body;
    var queryFilters = "";
    if (Object.keys(filters).length !== 0) {
      queryFilters = (
        filters.numberOfTrophies
          ? ` numberOfTrophies=${filters.numberOfTrophies} `
          : " "
      )
        .concat(filters.country ? ` country="${filters.country}" ` : " ")
        .concat(filters.stadium ? ` stadium="${filters.stadium}" ` : " ");
    }
    console.log(queryFilters);
    const q =
      `select * from team join club on team.ID = club.teamId ` +
      (queryFilters.length > 1 ? ` where ${queryFilters} ` : "");
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
exports.getFilteredNationalTeams = async (req, res) => {
  try {
    const filters = req.body;
    var queryFilters = "";
    if (Object.keys(filters).length !== 0) {
      queryFilters = (
        filters.numberOfTrophies
          ? ` numberOfTrophies=${filters.numberOfTrophies}`
          : ""
      ).concat(filters.country ? ` continent="${filters.country}"` : "");
    }
    const q =
      `select * from team join nationalTeam on team.ID = nationalTeam.teamId ` +
      (queryFilters.length > 1 ? ` where ${queryFilters} ` : "");

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

exports.createClub = async (req, res) => {
  try {
    const club = req.body;
    const q = `CALL addClub("${club.teamName}", ${club.numberOfTrophies}, "${club.logo}", "${club.stadium}", "${club.country}")`;
    await db.query(q, (error, results, fields) => {
      if (error) {
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

exports.createNationalTeam = async (req, res) => {
  try {
    const nationalTeam = req.body;
    const q = `CALL addNationalTeam("${nationalTeam.teamName}", ${nationalTeam.numberOfTrophies}, "${nationalTeam.logo}", "${nationalTeam.country}")`;
    await db.query(q, (error, results, fields) => {
      if (error) {
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

exports.updateTeam = async (req, res) => {
  try {
    const team = req.body;
    const q = `CALL editTeam(${team.ID},"${team.teamName}", "${team.logo}", ${team.numberOfTrophies})`;
    await db.query(q, (error, results, fields) => {
      if (error) {
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

exports.deleteTeam = async (req, res) => {
  try {
    await db.query(
      `delete from team where id=${req.params.id}`,
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
