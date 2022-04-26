const db = require("../../db.config");
exports.getAllTeams = async (req, res) => {
  try {
    await db.query("select * from Team", (error, results, fields) => {
      if (error) {
        res.send(error);
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.createTeam = async (req, res) => {
  try {
    await db.query("insert into Team", (error, results, fields) => {
      if (error) {
        res.send(error);
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
    const targetTeam = await Team.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    });
    res.json({
      message: "Team Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    await db.query(
      `delete from Team where id=${req.params.id}`,
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
