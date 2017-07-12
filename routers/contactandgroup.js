var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Cg = require('../models/cg');
var Contact = require('../models/contact');
var Group = require('../models/group');


// router.get('/edit/:id', function(req, res){
//   Address.edit(DBmodel.connection, req.params.id)
//   .then (function (rows) {
//           Contact.findAll(DBmodel.connection)
//           .then (function (rows2) {
//         res.render('addressedit', {dataAdd: rows, dataCon: rows2});
//       })
//     })
// });

  router.get('/', function(req, res){
    Cg.findAll(DBmodel.connection)
      .then (function (rows) {
        Contact.findAll(DBmodel.connection)
          .then (function (rows2) {
            Group.findAll(DBmodel.connection)
            .then (function (rows3) {
              res.render('cg', {dataCG: rows, dataCont: rows2, dataGroup: rows3});
                    })
                  })
                })
              });

  router.post('/', function(req, res){
      Cg.AddNew(DBmodel.connection, req.body);
      res.redirect('/contactandgroup');
  });



module.exports = router;
