var express = require("express");
var router = express.Router();
var pressController = require("../src/controllers/press");

router.get("/", pressController.getArticles);
router.get("/:id", pressController.getArticleById);

module.exports = router;
