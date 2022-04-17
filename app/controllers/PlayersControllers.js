// const Player = require("../models/PlayerModel");
const db = require("../../db.config");
exports.getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await db.query("select * from players");
    res.send(allPlayers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = Player({
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    });
    await newPlayer.save().then(() => {
      res.json({
        message: "Player Successfully Created",
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const targetPlayer = await Player.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    });
    res.json({
      message: "Player Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const targetPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!targetPlayer) {
      return res.sendStatus(404);
    }
    res.json({
      targetPlayer,
      message: "Player Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
