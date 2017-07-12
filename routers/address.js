const express = require('express');
var router = express.Router();
const Address = require('../models/address');
const dbModel = require('../models/dbModel');
const Contact = require('../models/contact');
let dataModel = new dbModel('./db/data.db')


router.get('/', function (req, res) {
  Address.readData(dataModel.connection, function (err, data) {
    res.render('address', {address: data})
  })
})

router.get('/add', function (req, res) {
  Contact.readData(dataModel.connection, function (err, data) {
    res.render('address_add', {contacts_list: data})
  });
})

router.post('/add', function (req, res) {
  Address.insertData(dataModel.connection, req.body);
  res.redirect('/addresses')
})

router.get('/:id/delete', function (req, res) {
  Address.deleteData(dataModel.connection, req.params);
  res.redirect('/addresses')
})

router.get('/:id/edit', function(req, res){
  Address.readUpdateData(dataModel.connection, req.params, function (err, data) {
  res.render('addresses_edit',{edit: data})
  });
})

router.post('/:id/edit', function (req, res) {
  Address.updateData(dataModel.connection, req.body, req.params);
  res.redirect('/addresses')
})

module.exports = router
