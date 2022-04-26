const express = require("express");
const router = express.Router();
const TeamControllers = require("../controllers/TeamsControllers");

router.get("/all", TeamControllers.getAllTeams);
router.post("/create", TeamControllers.createTeam);
router.put("/update/:id", TeamControllers.updateTeam);
router.delete("/delete/:id", TeamControllers.deleteTeam);

module.exports = router;
