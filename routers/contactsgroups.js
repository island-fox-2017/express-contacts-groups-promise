var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
const ContactGroup = require('../models/contactgroup');
const Group = require('../models/group');
const Contact = require('../models/contact')

let dbModel = new DbModel('data.db');


// CONTACTSGROUPS ROUTER
// router.get('/', function(req,res){
//   ContactGroup.findAllContactGroup(dbModel.connection, function(err,rows){
//     Contact.findAllContact(dbModel.connection, function(err, rowsContact){
//       Group.findAllGroups(dbModel.connection, function(err, rowsGroup){
//         if(!err) {
//           res.render('contactsgroups', {
//             panggilData: rows,
//             panggilDataContact: rowsContact,
//             panggilDataGroup: rowsGroup
//           })
//         }
//       })
//     })
//   })
// })
router.get('/', function(req,res) {
  ContactGroup.findAllContactGroup(dbModel.connection)
  .then(function(data1){
    return Contact.findAllContact(dbModel.connection)
    .then(function(data2){
      return Group.findAllGroups(dbModel.connection)
      .then(function(data3){
        res.render('contactsgroups', {
          panggilData: data1,
          panggilDataContact: data2,
          panggilDataGroup: data3
        })
      })
    })
  })
})














router.post('/', function (req, res){
  ContactGroup.insertContactGroup(dbModel.connection, req.body);
  res.redirect('/contactsgroups');
})



module.exports = router;
