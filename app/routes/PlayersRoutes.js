const express = require("express");
const router = express.Router();
const PlayerControllers = require("../controllers/PlayersControllers");

router.get("/all", PlayerControllers.getAllPlayers);
router.post("/create", PlayerControllers.createPlayer);
router.put("/update/:id", PlayerControllers.updatePlayer);
router.delete("/delete/:id", PlayerControllers.deletePlayer);

module.exports = router;
