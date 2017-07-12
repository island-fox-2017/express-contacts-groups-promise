var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DbModel');
const dGC = require('../models/groups-contacts');
const Contact = require('../models/contact');
const dGroup = require('../models/groups');
let dbModel = new ModelDb('./db/data.db');



// router.get('/', function (req, res) {
//   dGC.showContactsGroups(dbModel.connection, function (err, data) {
//     dGroup.showGroups(dbModel.connection, function (err, data2) {
//       Contact.showContact(dbModel.connection, function (err, data3) {
//         res.render('groups-contacts', {gc_data: data, group_data: data2, contact_data: data3});
//       })
//     })
//   })
// })

router.get('/', function (req, res) {
  dGC.showGCName(dbModel.connection)
  .then(function(data) {
    dGroup.showGroups(dbModel.connection)
    .then(function(data2) {
      Contact.showContact(dbModel.connection)
      .then(function(data3) {
        res.render('groups-contacts', {gc_data: data, group_data: data2, contact_data: data3});
      })
    })
  })
  .catch(function(err) {
    console.log(err);
  })
})


// router.get('/', function (req, res) {
//   dGC.showGCName(dbModel.connection, function (err, data) {
//     dGroup.showGroups(dbModel.connection, function (err, data2) {
//       Contact.showContact(dbModel.connection, function (err, data3) {
//         res.render('groups-contacts', {gc_data: data, group_data: data2, contact_data: data3});
//       })
//     })// res.render('groups-contacts', {gc_data: data});
//   })
// })

router.post('/', function (req, res) {
  dGC.insertContactsGroups(dbModel.connection, req.body);
  res.redirect('/groups-contacts')
})

router.get('/delete/:id', function(req, res) {
  dGC.deleteContactsGroups(dbModel.connection, req.params);
    res.redirect('/groups-contacts')
})



module.exports = router;
