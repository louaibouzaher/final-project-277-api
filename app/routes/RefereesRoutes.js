const express = require("express");
const router = express.Router();
const RefereesControllers = require("../controllers/RefereesControllers");

router.get("/all", RefereesControllers.getAllReferees);
router.post("/create", RefereesControllers.createReferee);
router.put("/update/:id", RefereesControllers.updateReferee);
router.delete("/delete/:id", RefereesControllers.deleteReferee);

module.exports = router;
