'use strict'
var express = require('express')
var router = express.Router()

var dbModel = require('../models/dbModel')
var connector = new dbModel('./database/data.db')

var contactModel = require('../models/contactModel')


// routing contacts
router.get('/contacts', function(req,res) {
  contactModel.selectAll(connector.connection)
  .then((data) => {
    res.render('contact', {dataKontak: data})
  })
})

router.post('/contacts', function(req,res) {
  contactModel.insertData(connector.connection, req.body)
  res.redirect('/contacts')
})

router.get('/contacts/delete/:id',function(req, res) {
  contactModel.deleteData(connector.connection, req.params)
  res.redirect('/contacts')
})

router.get('/contacts/edit/:id', function (req,res) {
  contactModel.getEditData(connector.connection, req.params)
  .then((data) => {
    res.render('edit_contact', {dataEdit: data})
  })
})

router.post('/contacts/edit/:id', function(req,res) {
  contactModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/contacts')
})

router.get('/contacts/addresses/:id', function(req,res) {
  contactModel.showAddress(connector.connection, req.params)
  .then((data) => {
    res.render('show_address', {dataAddress: data})
  })
})

router.get('/contacts/groups/:id', function(req,res) {
  contactModel.showGroup(connector.connection, req.params)
  .then((data) => {
    res.render('show_group', {dataGroup: data})
  })
})

module.exports = router
