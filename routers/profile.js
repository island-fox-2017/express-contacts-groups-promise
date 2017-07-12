'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Profile = require('../models/Profiles');
let dbModel = new DbModel('./db/data.db');

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

// Profile Routing

router.get('/', function(req, res) {
  db.all(`
    SELECT * FROM Profiles;
    `, function(err, rows) {
      if (!err) {
        db.all(`
          SELECT id, name FROM Contacts;
          `, function (err, rows2) {
            if(!err) {
              res.render('profiles', {datas: rows, selectContact: rows2});
            }
        });
      }
    });
});

router.post('/', function (req, res) {
  Profile.insertData(dbModel.connection, req.body);
  res.redirect('/profiles');
});

router.get('/delete/:id', function(req, res) {
  Profile.deleteData(dbModel.connection, req.params.id);
  res.redirect('/profiles');
});

router.get('/edit/:id', function(req, res) {
  Profile.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_profiles', {datas: rows});
    }
  });
});

router.post('/edit/:id', function(req, res) {
  Profile.updateData(dbModel.connection, req.body);
  res.redirect('/profiles');
});

router.get('/:id', function(req, res) {
  Profile.showProfileForContact(dbModel.connection, req.params.id, function (err, rows) {
    if(!err) {
      res.render('profileShow', {datas: rows});
    }
  })
});

module.exports = router;
