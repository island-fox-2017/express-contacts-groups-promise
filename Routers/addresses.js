const express = require('express');
const dbAddress = require('../Models/dbAddress');
const dbModel = require('../Models/dbModels');
const dbContacts = require('../Models/dbContacts');

var router = express.Router();
var dbmodel = new dbModel('./db/contact_group.db');


router.get('/', function (req, res){
  dbAddress.selectContactAddress(dbmodel.conn)
    .then(function(rows1){
      dbContacts.selectAll(dbmodel.conn)
      .then(function(rows2){
        res.render('address', {header : 'This is Address Page', data_addresses : rows1, data_contacts : rows2});
      })
    })
    .catch(function(err){
      console.log(err);
    })
  });
  
  // dbAddress.selectContactAddress(dbmodel.conn, function(err, rows1){
  //   dbContacts.selectAll(dbmodel.conn, function (err, rows2){
  //     res.render('address', {header : 'This is Address Page', data_addresses : rows1, data_contacts: rows2});
  //   })
  // })

router.post('/', function(req, res){
  dbAddress.insert(dbmodel.conn,req.body);
  res.redirect('/address');
})

router.get('/edit/:id', function(req, res){
  dbAddress.selectById(dbmodel.conn, req.params.id)
    .then(function(rows1){
      dbContacts.selectAll(dbmodel.conn)
      .then(function(rows2){
        res.render('edit_address', {header : 'Address Edit Page', data_address : rows1, data_contacts : rows2});
        console.log(rows1);
      });
    })
    .catch(function(){
      console.log(err);
    })
  });
    
router.post('/edit/:id', function(req, res){
  dbAddress.update(dbmodel.conn, req.params.id, req.body);
  res.redirect('/address');
})

router.get('/delete/:id', function(req, res){
  dbAddress.delete(dbmodel.conn, req.params.id);
  res.redirect('/address');
})


module.exports = router;
