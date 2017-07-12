var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');
const group = require('../models/groups');

router.get('/', function(req,res) {
  group.selectAll(db.connection, function(err, rows) {
    res.render('groups', {data_group: rows})
  }) 
})

router.post('/add', function(req, res) {
  res.render('group_add', {})
})

router.post('/', function(req, res) {
  group.insertData(db.connection, req.body)
    res.redirect('/groups')
})

router.get('/edit/:id', function(req, res) {
  group.findById(db.connection, req.params, function(err, rows) {
    res.render('group_edit', {data_group: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  group.updateData(db.connection, req.body, req.params)
    res.redirect('/groups')
})

router.get('/delete/:id', function(req, res) {
  group.deleteData(db.connection, req.params)
    res.redirect('/groups')
})

module.exports = router
