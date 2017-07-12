var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const ContactGroup = require('../models/contactgroup');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  ContactGroup.showAllDataContactGroup(dbModel.connection, function(err, rows) {
    if(!err) {
      ContactGroup.forSelectOptionByContactId(dbModel.connection, function(err, rows2){
        if (!err) {
          ContactGroup.forSelectOptionByGroupId(dbModel.connection, function(err, rows3){
            res.render('contactgroup', {data: rows, data2: rows2, data3: rows3})
          })
        }
      })
    }
  })
})

router.post('/', function(req, res) {
  ContactGroup.insertDataContactGroup(dbModel.connection, req.body);
  res.redirect('/contactgroup');
});

router.get('/edit/:id', function(req, res) {
  ContactGroup.showDataContactGroupsById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      ContactGroup.forSelectOptionByContactId(dbModel.connection, function (err, rows2) {
        if (!err) {
          ContactGroup.forSelectOptionByGroupId(dbModel.connection, function (err, rows3) {
            if (!err) {
              res.render('contactgroup-edit', {data:rows, dataContact: rows2, dataGroup: rows3})
            }
          })
        }
      })
    }
  })
})

router.post('/update/:id', function(req, res) {
  ContactGroup.updateDataContactGroupsById(dbModel.connection, req.body, req.params.id);
  res.redirect('/contactgroup')
})

router.get('/delete/:id', function(req, res) {
  ContactGroup.deleteDataContactGroupById(dbModel.connection, req.params.id);
  res.redirect('/contactgroup');
})

module.exports = router
