'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Groups = require('../models/groups');
const Contacts = require('../models/contacts');
const GroupsContacts = require('../models/groupsContacts');
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;

//groupsContacts Routing
router.get('/', function(req, res){
  GroupsContacts.findAll(connection)
  .then(function(rows){
    Contacts.findAll(connection)
    .then(function(rows2){
      Groups.findAll(connection)
      .then(function(rows3){
        res.render('groups-contacts', {datas: rows, data_c: rows2, data_g: rows3});
      })
    })
  })
})

router.post('/', function(req, res){
  GroupsContacts.insertData(connection, req.body);
  res.redirect('/groups-contacts');
})

router.get('/delete/:id', function(req, res){
  GroupsContacts.deleteData(connection, req.params.id);
  res.redirect('/groups-contacts');
})


module.exports = router;
