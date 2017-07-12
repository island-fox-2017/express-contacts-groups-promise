'use strict'
var express = require('express')
var router = express.Router()

var dbModel = require('../models/dbModel')
var connector = new dbModel('./database/data.db')

var addressModel = require('../models/addressModel')
var contactModel = require('../models/contactModel')


// routing address
router.get('/addresses', function(req,res) {
  addressModel.selectAll(connector.connection)
  .then((data) => {
    contactModel.selectAll(connector.connection)
    .then((data2) => {
      res.render('address', {dataAd : data, dataKontak: data2})
    })
  })
})

router.post('/addresses', function(req,res) {
  addressModel.insertData(connector.connection, req.body)
  res.redirect('/addresses')
})

router.get('/addresses/delete/:id', function(req,res) {
  addressModel.deleteData(connector.connection, req.params)
  res.redirect('/addresses')
})

router.get('/addresses/edit/:id', function(req,res) {
  addressModel.getEditData(connector.connection, req.params)
  .then((data) => {
    contactModel.selectAll(connector.connection)
    .then((data2) => {
      res.render('edit_address', {dataEdit: data, dataKontak: data2})
    })
  })
})

router.post('/addresses/edit/:id', function(req,res) {
  addressModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/addresses')
})


module.exports = router
