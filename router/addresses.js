var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');
const address = require('../models/addresses');

router.get('/', function(req, res) {
  address.selectAll(db.connection, function(err, rows) {
    res.render('addresses', {data_address : rows})
  })
})

router.post('/add', function(req,res) {
  address.dropDownContact(db.connection, function(err, rows) {
    res.render('address_add', {name_contact: rows})
  })
})

router.post('/', function(req, res) {
  address.insertData(db.connection, req.body)
    res.redirect('/addresses')
})

function dropDownContact() {
  return new Promise(function(resolve, reject) {
    address.dropDownContact(db.connection, function(err, rows) {
      if (!err) {
        resolve(rows)
      } else {
        reject(err)
      }
    })  
  })  
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    address.findById(db.connection, id, function(err, rows) {
      if (!err) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
}

router.get('/edit/:id', function(req, res) {
  findById(req.params)
  .then (function(rows) {
    dropDownContact()
    .then (function(rows2) {
      res.render('address_edit', {data_address: rows, name_contact: rows2})
    })
  }) 
})

// router.get('/edit/:id', function(req, res) {
//   address.dropDownContact(db.connection, function(err1, rows1) {
//     address.findById(db.connection, req.params, function(err2, rows2) {
//       res.render('address_edit', {name_contact : rows1, data_address : rows2})
//     })  
//   })
// })

router.post('/edit/:id', function(req, res) {
  address.updateData(db.connection, req.body, req.params)
    res.redirect('/addresses')
})

router.get('/delete/:id', function(req, res) {
  address.deleteData(db.connection, req.params)
    res.redirect('/addresses')
})

router.get('/:id', function(req, res) {
  address.findAddressByContact(db.connection, req.params, function(err, rows) {
    res.render('address_show', {show_address : rows})    
  })
})

module.exports = router