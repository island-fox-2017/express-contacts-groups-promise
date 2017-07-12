'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Address = require('../models/Addresses');
let dbModel = new DbModel('./db/data.db');

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

// Address Routing

router.get('/', function(req, res) {
  db.all(`
    SELECT * FROM Address;
    `, function(err, rows) {
      if(!err) {
        db.all(`
          SELECT id, name FROM Contacts;
          `, function(err, rows2) {
            if(!err) {
              res.render('address', {datas: rows, selectContact: rows2});
            }
        });
      }
    });
});

router.post('/', function(req, res) {
  Address.insertData(dbModel.connection, req.body);
  res.redirect('/address');
});

router.get('/delete/:id', function(req, res) {
  Address.deleteData(dbModel.connection, req.params.id);
  res.redirect('/address');
});

router.get('/edit/:id', function(req, res) {
  Address.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_address', {datas: rows});
    }
  });
});

router.post('/edit/:id', function (req, res) {
  Address.updateData(dbModel.connection, req.body);
  res.redirect('/address');
});

router.get('/:id', function(req, res) {
  Address.showAddressForContact(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('addressShow', {datas: rows});
    }
  })
});

module.exports = router;
