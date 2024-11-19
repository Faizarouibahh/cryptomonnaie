var express = require("express");
var router = express.Router();
var userPress_controller = require("../src/controllers/userPress");

router.post("/addKeyword", userPress_controller.addKeyword);
router.post("/removeKeyword", userPress_controller.removeKeyword);
router.get("/getUserKeywords/:userId", userPress_controller.getUserKeywords);
module.exports = router;
