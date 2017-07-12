const express = require('express');
var router = express.Router();
const Group = require('../models/group');
const dbModel = require('../models/dbModel');
let dataModel = new dbModel('./db/data.db')



//groups routing
router.get('/', function(req, res){
  Group.readData(dataModel.connection, function (err, data) {
    res.render('groups',{groups_list: data})
  });
})

router.post('/', function (req, res) {
  Group.insertData(dataModel.connection, req.body)
  res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  // console.log(req.params.id);
  Group.readUpdateData(dataModel.connection, req.params, function (err, data) {
    res.render('groups_edit',{groups_list: data})
  });
})

router.post('/edit/:id', function (req, res) {
  Group.updateData(dataModel.connection, req.body, req.params);
  res.redirect('/groups')
})

router.get('/delete/:id', function (req, res) {
Group.deleteData(dataModel.connection, req.params);
res.redirect('/groups')
})


module.exports = router
