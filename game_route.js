var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/Space-Invaders", function (req, res, next) {
    res.render("client_game", { title: "Express" });
});

module.exports = router;
