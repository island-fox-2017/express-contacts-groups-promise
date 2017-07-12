var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Profile = require('../models/profile');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  Profile.showProfile(dbModel.connection, function (err, rows) {
    if (!err) {
      Profile.forSelectOptionByContactId(dbModel.connection, function (err, rows2) {
        res.render('profile', {data: rows, data2: rows2})
      })
    }
  })
})

router.post('/', function(req, res) {
  Profile.insertDataProfile(dbModel.connection, req.body);
  res.redirect('/profile');
});

router.get('/edit/:id', function(req, res) {
  Profile.showDataProfileById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      Profile.forSelectOptionByContactId(dbModel.connection, function (err, rows2) {
        if (!err) {
          res.render('profile-edit', {data:rows, dataContact: rows2})
        }
      })
    }
  })
})

router.post('/update/:id', function(req, res) {
  Profile.updateDataProfileById(dbModel.connection, req.body, req.params.id);
  res.redirect('/profile')
})

router.get('/delete/:id', function(req, res) {
  Profile.deleteDataProfile(dbModel.connection, req.params.id);
  res.redirect('/profile');
})

module.exports = router
