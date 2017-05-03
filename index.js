var express = require('express');
var router = express.Router();
var pg = require("pg");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/******** router action for API's *******/

router.use('//',require('./'));
;


module.exports = router;
