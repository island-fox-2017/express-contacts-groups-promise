'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Group = require('../models/Groups');
let dbModel = new DbModel('./db/data.db');

// Group Routing
router.get('/', function (req, res) {
  Group.showData(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('groups', {datas: rows});
    }
  })
});

router.post('/', function (req, res) {
  Group.insertData(dbModel.connection, req.body);
  res.redirect('/groups')
});

router.get('/delete/:id', function(req, res) {
  Group.deleteData(dbModel.connection, req.params.id);
  res.redirect('/groups');
});

router.get('/edit/:id', function (req, res) {
  Group.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_groups', {data: rows});
    }
  });
});

router.post('/edit/:id', function (req, res) {
  Group.updateData(dbModel.connection, req.body);
  res.redirect('/groups');
});

module.exports = router;
