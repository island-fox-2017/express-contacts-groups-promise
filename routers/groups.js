var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Group = require('../models/groups');
const ContactGroup = require('../models/contactgroup');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  Group.showGroups(dbModel.connection, function (err, rows) {
    if (!err) {
      res.render('groups', {data: rows})
    }
  })
})

router.post('/', function(req, res) {
  Group.insertDataGRoups(dbModel.connection, req.body);
  res.redirect('/groups');
});

router.get('/edit/:id', function(req, res) {
  Group.showDataGroupsById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      res.render('group-edit', {data:rows})
    }
  })
})

router.post('/update/:id', function(req, res) {
  Group.updateDataGroupsById(dbModel.connection, req.body, req.params.id);
  res.redirect('/groups')
})

router.get('/delete/:id', function(req, res) {
  Group.deleteDataGroupsById(dbModel.connection, req.params.id);
  ContactGroup.deleteDataContactGroupById(dbModel.connection, req.params.id);
  res.redirect('/groups');
})

module.exports = router
