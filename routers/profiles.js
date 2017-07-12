'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Profiles = require('../models/profiles');
const Contacts = require('../models/contacts');
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;

//profiles ROUTING
router.get('/', function(req, res){
  Profiles.findAll(connection)
  .then(function(rows){
      Contacts.findAll(connection)
      .then(function(rows2){
        res.render('profiles',{datas: rows, data_contact: rows2});
      })
  })
})

router.post('/', function(req, res){
  Profiles.insertData(connection, req.body)
  res.redirect('/profiles')
})

router.get('/delete/:id', function(req, res){
  Profiles.deleteData(connection, req.params.id);
  res.redirect('/profiles')
})

router.get('/edit/:id', function(req, res){
  Profiles.findById(connection, req.params.id)
  .then(function(row){
    Contacts.findAll(connection)
    .then(function(rows){
      res.render('editProfiles', {datas: row, data_contact: rows})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Profiles.updateData(connection, req.body, req.params.id)
  res.redirect('/profiles')
})

router.get('/details/:id', function(req, res){
  Profiles.joinToContact(connection, req.params.id)
  .then(function(row){
    res.render('profilesDetails', {datas: row})
  })
})


module.exports = router;
