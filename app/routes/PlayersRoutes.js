const express = require("express");
const router = express.Router();
const PlayerControllers = require("../controllers/PlayersControllers");

router.get("/all", PlayerControllers.getAllProducts);
router.post("/create", PlayerControllers.createProduct);
router.put("/update/:id", PlayerControllers.updateProduct);
router.delete("/delete/:id", PlayerControllers.deleteProduct);

module.exports = router;
