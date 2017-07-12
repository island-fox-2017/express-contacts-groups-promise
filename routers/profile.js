const express = require('express');
var router = express.Router();
const Profile = require('../models/profile');
const Contact = require('../models/contact');
const dbModel = require('../models/dbModel');
let dataModel = new dbModel('./db/data.db')


// let connection = dataModel.connection;
router.get('/', function (req, res) {
  Profile.readData(dataModel.connection, function (err, data) {
  res.render('profile', {profile_list: data})
  });
})
router.get('/add', function(req, res){
  Contact.readData(dataModel.connection, function (err, data) {
    res.render('profile_add', {contacts_list: data})
  });
})

router.post('/add', function (req, res) {
  Profile.insertData(dataModel.connection, req.body)
    res.redirect('/profile')
})

router.get('/:id/contact_detail', function (req, res) {
  Profile.detailContact(dataModel.connection, req.params, function (err, data) {
    res.render('detail', {detail_profile: data})
  });
})

router.get('/:id/delete', function (req, res) {
  Profile.deleteData(dataModel.connection,req.params);
  res.redirect('/profile')
})


router.get('/:id/edit', function(req, res){
  Profile.readUpdateData(dataModel.connection, req.body, req.params, function (err, data) {
    res.render('profile_edit',{edit: data})
  })
})
router.post('/:id/edit', function (req, res) {
  Profile.updateData(dataModel.connection, req.body, req.params)
  res.redirect('/profile')
})

module.exports = router
