const express = require('express');
var router = express.Router();
const MyGroup = require('../models/mygroups');
const dbModel = require('../models/dbModel');
const Group = require('../models/group');
const Contact = require('../models/contact');
let dataModel = new dbModel('./db/data.db')

router.get('/', function (req, res) {
  MyGroup.showData(dataModel.connection, function (err, data) {
    Contact.readData(dataModel.connection, function (err, kontak) {
      Group.readData(dataModel.connection, function (err, group) {
        res.render('my_group', {grouping_data: data, datakontak: kontak, datagroup: group})

      })
    })
  })
})

router.post('/my-contact-groups', function(req, res) {
  MyGroup.insertData(dataModel.connection, req.body);
  res.redirect('/my-contact-groups')
})

module.exports = router
