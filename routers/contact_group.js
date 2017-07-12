'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Contact_Group = require('../models/Contacts_Groups');
let dbModel = new DbModel('./db/data.db');

// Contact Group Routing

router.get('/', function(req, res) {
  Contact_Group.showData(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('contacts-groups', {datas: rows});
    }
  });
});

router.post('/', function(req, res) {
  Contact_Group.insertData(dbModel.connection, req.body);
  res.redirect('/contacts-groups');
});

router.get('/delete/:id', function (req, res) {
  Contact_Group.deleteData(dbModel.connection, req.params.id);
  res.redirect('/contacts-groups');
});

module.exports = router;
