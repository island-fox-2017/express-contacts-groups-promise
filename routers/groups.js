var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DbModel');
const dGroup = require('../models/groups');
let dbModel = new ModelDb('./db/data.db');


//Groups Setting
router.get('/', function (req, res) {
  dGroup.showGroups(dbModel.connection, function (err, data) {
  // db.all("SELECT * FROM Groups", function (err, data) {
    res.render('groups', {group_data: data})
  })
})

router.post('/', function (req, res) {
  dGroup.insertGroups(dbModel.connection, req.body);
  // db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.nama_group}')`);
    res.redirect('/groups');
})


//Groups Edit
router.get('/edit/:id', function(req, res) {
  dGroup.editGroups(dbModel.connection, req.params, function (err, data){
  // db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, data){
    res.render('edit_group', {group_data: data})
  })
})

router.post('/edit/:id', function(req, res){
  dGroup.updateGroups(dbModel.connection, req.body, req.params);
  // db.run(`UPDATE Groups SET name_of_group='${req.body.nama_group}' WHERE id=${req.params.id}`)
  res.redirect('/groups')
})

//Groups Delete
router.get('/delete/:id', function(req, res) {
  dGroup.deleteGroups(dbModel.connection, req.params)
  // db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/groups')
})







module.exports = router
