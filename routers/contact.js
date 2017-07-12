const express = require('express');
var router = express.Router();
const Contact = require('../models/contact');
const dbModel = require('../models/dbModel');

let dataModel = new dbModel('./db/data.db')


//contacts routing
router.get('/', function (req, res) {
  Contact.readData(dataModel.connection)
    .then(function (rows) {
      res.render('contacts', {contacts_list: rows})
      console.log(rows[0].id);
    })
})

router.get('/add', function(req, res){
  res.render('contacts_add')
})

router.post('/add', function (req, res) {
  Contact.insertData(dataModel.connection,req.body);
  res.redirect('/contacts')
})

router.get('/edit/:id', function(req, res){
  Contact.readUpdateData(dataModel.connection, req.params, function (err, data) {
    res.render('contacts_edit',{contacts_list: data})
  });
})

router.post('/edit/:id', function (req, res) {
  Contact.updateData(dataModel.connection, req.body, req.params);
  res.redirect('/contacts')
})

router.get('/delete/:id', function (req, res) {
  Contact.deleteData(dataModel.connection, req.params)
  res.redirect('/contacts')
})

router.get('/show-address/:id', function (req, res) {
  Contact.showAddressDetail(dataModel.connection, req.params, function (err, data) {
    res.render('show_address', {show: data})
  })
})
module.exports = router
