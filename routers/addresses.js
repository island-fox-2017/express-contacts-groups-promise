'use strict'

const router = require('express').Router();

// database
const DbModel = require('../model/dbconnect.js');
let db = new DbModel('./db/data.db');

// model
const Addresses = require('../model/addresses');


// router.get('/', (req, res) => {
//   Addresses.findAll(db.connection, (err, table, dropList) => {
//     if (!err) res.render('addresses', {table: table, dropList: dropList});
//     else console.log(err);
//   });
// });

router.get('/', (req, res) => {
  Addresses.findAll(db.connection)
  .then(table => {
    Addresses.dropList(db.connection)
    .then(dropList => {
      // console.log('aaa',table);
      res.render('addresses', {table: table, dropList: dropList});
    });
  });
});

router.get('/edit/:id', (req, res) => {
  Addresses.editView(db.connection, req.params.id, (err, rows) =>{
    if (!err) res.render('editaddresses', {data: rows});
    else console.log(err);
  });
});

router.post('/edit/:id', (req, res) => {
  Addresses.edit(db.connection, req.body, req.params.id, err => {
    if (!err) res.redirect('/addresses');
    else console.log(err);
  });
});

router.post('/', (req, res) => {
  Addresses.add(db.connection, req.body, (err, rows) => {
    if (!err) res.redirect('addresses')
    else console.log(err);
  });
});

router.get('/delete/:id', (req, res) => {
  Addresses.del(db.connection, req.params.id, err => {
    if (!err) res.redirect('/addresses');
    else console.log(err);
  });
});


module.exports = router;