const express = require("express");
const router = express.Router();
const TeamsControllers = require("../controllers/TeamsControllers");

router.get("/club/all", TeamsControllers.getAllClubs);
router.get("/nationalteam/all", TeamsControllers.getAllNationalTeams);
router.post("/club/filter", TeamsControllers.getFilteredClubs);
router.post("/nationalteam/filter", TeamsControllers.getFilteredNationalTeams);
router.post("/club/create/", TeamsControllers.createClub);
router.post("/nationalteam/create/", TeamsControllers.createNationalTeam);
router.put("/update/:id", TeamsControllers.updateTeam);
router.delete("/delete/:id", TeamsControllers.deleteTeam);

module.exports = router;
