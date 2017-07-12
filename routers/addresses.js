var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DbModel');
const dAddr = require('../models/addresses');
let dbModel = new ModelDb('./db/data.db');



//Address Setting
router.get('/', function (req, res) {
  dAddr.showAddr(dbModel.connection)
  .then(function(data){
    dAddr.showNameContact(dbModel.connection)
    .then(function(data2){
      res.render('addresses', {addr_data: data, contact_data: data2})
    })
  })
  .catch(function(err) {
    console.log(err);
  })
})

router.post('/', function (req, res) {
  dAddr.insertAddr(dbModel.connection, req.body)
  // db.run(`INSERT INTO Address (street, city, zip, contact_id)
  // VALUES ('${req.body.street}', '${req.body.city}', ${req.body.zip}, '${req.body.kontak_id}' )`);
    res.redirect('/addresses');
})

//Address Edit
router.get('/edit/:id', function(req, res) {
  dAddr.editAddr(dbModel.connection, req.params)
  .then(function(data){
    dAddr.showNameContact(dbModel.connection)
    .then(function(data2){
      res.render('edit_address', {addr_data: data, contact_data: data2})
    })
  })
  .catch(function(err) {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  dAddr.updateAddr(dbModel.connection, req.body, req.params)
  // db.run(`UPDATE Address SET street='${req.body.street}', city='${req.body.city}', zip=${req.body.zip}  WHERE id=${req.params.id}`);
  // console.log(`UPDATE Address SET street='${req.body.street}', city='${req.body.city}', zip=${req.body.zip}  WHERE id=${req.params.id}`);
  res.redirect('/addresses')
})

//Address Delete
router.get('/delete/:id', function(req, res) {
  dAddr.deleteAddr(dbModel.connection, req.params)
  // db.run(`DELETE FROM Address WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/addresses')
})

module.exports = router
