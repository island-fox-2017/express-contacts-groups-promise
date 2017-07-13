'use strict'

const router = require('express').Router();

// database
const DbModel = require('../model/dbconnect.js');
let db = new DbModel('./db/data.db');

// model
const Contacts = require('../model/contacts');

// create
router.post('/', (req, res) => {
  Contacts.add(db.connection, req.body, (err, rows) => {
    if(!err) res.redirect('/contacts');
    else console.log(err);
  });
});

// read
router.get('/', (req, res) => {
  Contacts.findAll(db.connection, (err, table, dropList) => {
    if (!err) res.render('contacts', {table: table, dropList: dropList});
    else console.log(err);
  });
});

// update
router.get('/edit/:id', (req, res) => {
  Contacts.editView(db.connection, req.params.id, (err, rows) => {
    if (!err) res.render('editcontacts', {data: rows});
    else console.log(err);
  });
});

router.post('/edit/:id', (req, res) => {
  Contacts.edit(db.connection, req.body, req.params.id, err => {
    if (!err) res.redirect('/contacts');
    else console.log(err);
  });
});

// delete
router.get('/delete/:id', (req, res) => {
  Contacts.del(db.connection, req.params.id, err => {
    if (!err) res.redirect('/contacts');
    else console.log(err);
  });
});

module.exports = router;
