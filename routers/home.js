var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

router.get('/', function(req, res){
    res.render('home');
});

module.exports = router;
