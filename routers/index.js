'use strict'

const express = require('express');
const router = express.Router();

// Index Routing
router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;
