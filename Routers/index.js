const express = require('express');

var router = express.Router();


router.get('/', function (req, res){
  res.render('index',{header : 'This is main page'});
})





module.exports = router;
