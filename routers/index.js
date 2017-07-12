var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
let dbModel = new DbModel('data.db');

//--------------------- START here...
router.get('/', function(req, res){
  res.render("welcome")
})

module.exports = router
