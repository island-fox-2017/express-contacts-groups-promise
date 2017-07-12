var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');

const profile = require('../models/profiles');

router.get('/', function(req, res) {
  profile.selectAll(db.connection, function(err, rows) {
    res.render('profiles', {data_profile : rows})
  })
})

router.post('/add', function(req,res) {
  profile.dropDownContact(db.connection, function(err, rows) {
    res.render('profile_add', {name_contact: rows})
  })
})

router.post('/', function(req, res) {
  profile.insertData(db.connection, req.body)
    res.redirect('/profiles')
})

router.get('/edit/:id', function(req, res) {
  profile.dropDownContact(db.connection, function(err1, rows1) {
    profile.findById(db.connection, req.params, function(err2, rows2) {
      res.render('profile_edit', {name_contact : rows1, data_profile : rows2})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  profile.updateData(db.connection, req.body, req.params)
    res.redirect('/profiles')
})

router.get('/delete/:id', function(req, res) {
  profile.deleteData(db.connection, req.params)
    res.redirect('/profiles')
})

module.exports = router