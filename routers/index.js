var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');

let dbModel = new dbmodel ('./db/data.db');
dbModel.createTables();

router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
