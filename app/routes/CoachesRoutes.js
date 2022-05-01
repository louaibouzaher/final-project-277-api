const express = require("express");
const router = express.Router();
const CoachesControllers = require("../controllers/CoachesControllers");

router.get("/all", CoachesControllers.getAllCoaches);
router.post("/create", CoachesControllers.createCoach);
router.put("/update/:id", CoachesControllers.updateCoach);
router.delete("/delete/:id", CoachesControllers.deleteCoach);

module.exports = router;
