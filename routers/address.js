'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Address = require('../models/address');
const Contacts = require('../models/contacts')
let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

function manipulateAddress(rows){
  return new Promise(function(resolve, reject){
    var promises = rows.map(function(row){
      return new Promise(function(res, rej){
        Contacts.findById(connection,row.contacts_id)
        .then(function(contact){
          row['name'] = contact.name;
          res()
        })
      })
    })

    Promise.all(promises)
    .then(function(){
      resolve(rows)
    })
  })
}


//Address Routing
router.get('/', function(req, res){
  Address.findAll(connection)
  .then(function(rows){
    manipulateAddress(rows)
    .then(function(data){
      Contacts.findAll(connection)
      .then(function(rows2){
        res.render('address', {datas: data, data2:rows2})
      })
    })
  })

})

router.post('/', function(req, res){
  Address.insertData(connection, req.body)
  res.redirect('/address')
})

router.get('/delete/:id', function(req, res){
  Address.deleteData(connection, req.params.id);
  res.redirect('/address')
})

router.get('/edit/:id', function(req, res){
  Address.findById(connection, req.params.id)
  .then(function(row){
    Contacts.findAll(connection)
    .then(function(rows){
      res.render('editAddress', {datas: row, data_contact: rows})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Address.updateData(connection, req.body, req.params.id)
  res.redirect('/address')
})


module.exports = router;
