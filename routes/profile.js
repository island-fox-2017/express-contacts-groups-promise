const express = require('express');
const DbModel = require('../models/DbModel')
const Profile = require('../models/profile')
const Contact = require('../models/contact')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')

router.get('/', function(req, res){
  Profile.belongsToContact(dbModel.connection, function(err, rows){
    Contact.findAll(dbModel.connection, function(err, data){
      if(!err){
        res.render('profiles', {data_profile : rows, data_contact : data})
      }
    })
  })
})

router.post('/', function(req, res){
  Profile.create(dbModel.connection, req.body)
    res.redirect('/profiles')
})

router.get('/edit/:id', function(req, res){
  Profile.findById(dbModel.connection, req.params.id, function(err, rows){
    Contact.findAll(dbModel.connection, function(err, data){
      if(!err){
        res.render('editProfiles', {dataProfile : rows, dataContact:data})
      }
    });
  });
});


router.post('/edit/:id', function(req, res){
  Profile.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/profiles')
})

router.get('/delete/:id', function(req, res){
  Profile.destroy(dbModel.connection, req.params.id);
  res.redirect('/profiles');
})

module.exports = router;
