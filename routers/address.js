var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Addresses = require('../models/address');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  Addresses.showAddress(dbModel.connection, function (err, rows) {
    if (!err) {
      Addresses.forSelectOptionByContactId(dbModel.connection, function (err, rows2) {
        res.render('address', {data: rows, data2: rows2})
      })
    }
  })
})

router.post('/', function(req, res) {
  Addresses.insertDataAddress(dbModel.connection, req.body);
  res.redirect('/address');
});

router.get('/edit/:id', function(req, res) {
  Addresses.showDataAddressById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      Addresses.forSelectOptionByContactId(dbModel.connection, function (err, rows2) {
        if (!err) {
          res.render('address-edit', {data:rows, dataContact:rows2})
        }
      })
    }
  })
})

router.post('/update/:id', function(req, res) {
  Addresses.updateDataAddressById(dbModel.connection, req.body, req.params.id);
  res.redirect('/address')
})

router.get('/delete/:id', function(req, res) {
  Addresses.deleteDataAddressById(dbModel.connection, req.params.id);
  res.redirect('/address');
})

module.exports = router
