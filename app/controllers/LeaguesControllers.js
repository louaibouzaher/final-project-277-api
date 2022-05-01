const db = require("../../db.config");
exports.getAllLeagues = async (req, res) => {
  try {
    await db.query("select * from league", (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      }
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.createLeague = async (req, res) => {
  try {
    const league = req.body;
    await db.query(
      `INSERT INTO league (leagueName,leagueType,logo)
    VALUES ("${league.leagueName}", "${league.leagueType}", "${league.logo}");`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};
exports.editLeague = async (req, res) => {
  try {
    const league = req.body;
    await db.query(
      `UPDATE league set leagueName="${league.leagueName}" , leagueType ="${league.leagueType}", logo= "${league.logo}" where Id = ${league.Id};`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

exports.getLeagueMatches = async (req, res) => {
  try {
    await db.query(
      `select * from league_match vc join league l on vc.leagueName = l.leagueName where l.Id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};
exports.getLeagueChampions = async (req, res) => {
  try {
    await db.query(
      `select * from viewchampion vc join league l on vc.leagueName = l.leagueName where l.Id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

exports.addChampion = async (req, res) => {
  try {
    const champion = req.body;
    const q = `CALL addChampion("${champion.championLeagueName}", "${champion.championTeamName}", "${champion.dateOfChampion}", ${champion.championPrize})`;
    await db.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      }

      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};
exports.addMatch = async (req, res) => {
  try {
    const match = req.body;
    const q = `CALL addMatch("${match.hostTeamName}", "${match.guestTeamName}", "${match.stadiumName}", "${match.dateOfMatch}",
     "${match.league_Name}", "${match.refereeFirstName}","${match.refereeLastName}")`;
    await db.query(q, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      }
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteLeague = async (req, res) => {
  try {
    console.log(req.params.id);
    await db.query(
      `delete from league where Id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};
