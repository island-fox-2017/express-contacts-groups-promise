var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');
const contact = require('../models/contacts');
const group = require('../models/groups');
const contactGroup = require('../models/contacts_groups');

router.get('/', function(req, res) {
  contact.selectAll(db.connection, function(err, rows) {
    // contact.contactBelongsToGroups(db.connection, function(err, rows2) {
      res.render('contacts', {data_contact: rows})
    })
  // })
})

router.post('/add', function(req, res) {
  res.render('contact_add')
})

router.post('/contacts', function(req, res) {
  contact.insertData(db.connection, req.body)
    res.redirect('/contacts')
})

router.get('/edit/:id', function(req, res) {
  contact.findById(db.connection, req.params, function(err, rows) {
    res.render('contact_edit', {data_contact: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  contact.updateData(db.connection, req.body, req.params)
    res.redirect('/contacts')
})

router.get('/delete/:id', function(req, res) {
  contact.deleteData(db.connection, req.params)
    res.redirect('/contacts')
})

module.exports = router