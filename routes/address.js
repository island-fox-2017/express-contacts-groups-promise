const express = require('express');
const DbModel = require('../models/DbModel')
const Address = require('../models/address')
const Contact = require('../models/contact')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')

router.get('/', function(req, res){
  Address.belongsToContact(dbModel.connection, function(err, rows){
    Contact.findAll(dbModel.connection, function(err, data){
      if(!err){
        res.render('address', {data_address : rows, data_contact : data})
      }
    })
  })
})

router.post('/', function(req, res){
  Address.create(dbModel.connection, req.body)
    res.redirect('/address')
})

router.get('/edit/:id', function(req, res){
  Address.findById(dbModel.connection, req.params.id, function(err, rows){
    Contact.findAll(dbModel.connection, function(err, data){
      if(!err){
        res.render('editAddress', {dataAddress : rows, dataContact:data})
      }
    });
  });
});


router.post('/edit/:id', function(req, res){
  Address.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/address')
})

router.get('/delete/:id', function(req, res){
  Address.destroy(dbModel.connection, req.params.id);
  res.redirect('/address');
})

module.exports = router;
