var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Address = require('../models/address');
var Contact = require('../models/contact');

// router.get('/', function(req, res){
//   Contact.findAll(DBmodel.connection)
//   .then (function (rows) {
//     res.render('contact', {data_contact: rows});
//   })
// });

router.get('/', function(req, res){
    Address.findAll(DBmodel.connection)
    .then (function (rows) {
        Contact.findAll(DBmodel.connection)
        .then (function (rows2) {
            res.render('address', {dataAdd: rows,dataCon: rows2});
        })
    })
});

  // post add new address
  router.post('/', function(req, res){
      Address.AddNew(DBmodel.connection, req.body);
      res.redirect('/address');
  });

  // router.get('/', function(req, res){
  //     Address.findAll(DBmodel.connection)
  //     .then (function (rows) {
  //         Contact.findAll(DBmodel.connection)
  //         .then (function (rows2) {
  //             res.render('address', {dataAdd: rows,dataCon: rows2});
  //         })
  //     })
  // });

  router.get('/edit/:id', function(req, res){
    Address.edit(DBmodel.connection, req.params.id)
    .then (function (rows) {
            Contact.findAll(DBmodel.connection)
            .then (function (rows2) {
          res.render('addressedit', {dataAdd: rows, dataCon: rows2});
        })
      })
  });

  // router.get('/', function(req, res){
  //     Address.findAll(DBmodel.connection, function(err, data){
  //       if(!err)
  //       {
  //         data.forEach(function (data){
  //           // db each keluarin per object
  //           db.each(`SELECT * FROM Contact WHERE id = ${data.Contact_id}`, function (err, data_contact) {
  //             console.log('----', err);
  //             // data['firstname'] = data_contact.Name
  //             // data['firstname'] = data_contact.Name
  //           })
  //         })
  //         Contact.findAll(DBmodel.connection, function(err, data2)
  //         {
  //         res.render('address', {dataAdd: data, dataCon: data2});
  //         });
  //       }
  //     });
  //   });


  // post the edited
  router.post('/edit/:id', function(req, res){
    Address.updateEdit(DBmodel.connection, req.params.id, req.body);
    res.redirect('/address');
  })

  router.get('/delete/:id', function(req, res){
    Address.deleteCont(DBmodel.connection, req.params.id);
    res.redirect('/address');
  })


module.exports = router;
