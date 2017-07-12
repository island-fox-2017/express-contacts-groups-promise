var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DbModel');
const Contact = require('../models/contact');
const dProfile = require('../models/profiles');
const dAddr = require('../models/addresses');
const dGroup = require('../models/groups');
const dGC = require('../models/groups-contacts');
let dbModel = new ModelDb('./db/data.db')

//Contacts Setting
router.get('/', function (req, res) {
  // db.all(`SELECT * FROM Contacts`, function (err, data) {
  Contact.showContact(dbModel.connection, function (err, data) {
    dGroup.showGroups(dbModel.connection, function (err, data2) {
      res.render('contacts', {contact_data: data, group_data: data2})
    })
  })
})

router.post('/', function (req, res) {
  Contact.insertContact(dbModel.connection, req.body);
  // db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.nama}', '${req.body.company_name}', '${req.body.telp_num}', '${req.body.email}' )`);
    res.redirect('/contacts');
})

//Contacts Edit
router.get('/edit/:id', function(req, res) {
  Contact.editContact(dbModel.connection, req.params, function (err, data){
  // Contact.editContact(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function (err, data){
    res.render('edit_contact', {contact_data: data})
  })
})

router.post('/edit/:id', function(req, res){
  Contact.updateContact(dbModel.connection, req.body, req.params)
  // db.run(`UPDATE Contacts SET name='${req.body.nama}', company='${req.body.company_name}', telp_number='${req.body.telp_num}', email='${req.body.email}' WHERE id='${req.params.id}'`)
  res.redirect('/contacts')
})

//Contacts Delete
router.get('/delete/:id', function(req, res) {
  Contact.deleteContact(dbModel.connection, req.params)
  // db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/contacts')
})

//Profile Detail
router.get('/detail-profile/:id', function (req, res) {
  dProfile.showProfilesDetail(dbModel.connection, req.params, function(err, data) {
  // db.all(`SELECT * FROM Contacts LEFT JOIN Profile ON Contacts.id = Profile.contact_id WHERE Contacts.id=${req.params.id};`, function (err, data) {
    // console.log(data);
    res.render('contact-detail', {contact_data: data})
  })
})

//Address Detail
router.get('/detail-address/:id', function (req, res) {
  dAddr.showAddrDetail(dbModel.connection, req.params, function(err, data) {
  // db.all(`SELECT * FROM Contacts LEFT JOIN Address ON Contacts.id = Address.contact_id WHERE Contacts.id=${req.params.id};`, function (err, data) {
    res.render('address-detail', {contact_data: data})
  })
})

//List Groups
router.get('/list-groups/:id', function (req, res) {
  dGC.joinContactsGroups(dbModel.connection, req.params, function(err, data) {
    res.render('list-groups', {contact_data: data})
  })
})

module.exports = router
