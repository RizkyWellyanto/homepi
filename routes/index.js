/**
 * Created by rizky on 12/11/15.
 */

var express = require('express');
var router = express.Router();

// home endpoint
router.get('/', function(req, res, next) {
    res.send("IT WORKS");
});

module.exports = router;
