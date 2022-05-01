const express = require("express");
const router = express.Router();
const LeaguesControllers = require("../controllers/LeaguesControllers");

router.get("/all", LeaguesControllers.getAllLeagues);
router.get("/matches/:id", LeaguesControllers.getLeagueMatches);
router.get("/champions/:id", LeaguesControllers.getLeagueChampions);
router.post("/addchampion", LeaguesControllers.addChampion);
router.post("/addmatch", LeaguesControllers.addMatch);

module.exports = router;
