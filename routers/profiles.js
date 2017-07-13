'use strict'

const router = require('express').Router();

// database
const DbModel = require('../model/dbconnect.js');
let db = new DbModel('./db/data.db');

// model
const Profiles = require('../model/profiles');

// create
router.post('/', (req, res) => {
  Profiles.add(db.connection, req.body, (err, rows) => {
    if (!err) res.redirect('profiles');
    else console.log(err);
  });
});

// read
// router.get('/', (req, res) => {
//   Profiles.findAll(db.connection, (err, table, dropList) => {
//     if (!err) res.render('profiles', {table: table, dropList: dropList});
//     else console.log(err);
//   });
// });

router.get('/', (req, res) => {
  Profiles.findAll(db.connection)
  .then(table => {
    Profiles.dropList(db.connection)
    .then(dropList => {
      res.render('profiles', {table: table, dropList: dropList})
    });
  });
});

// update
router.get('/edit/:id', (req, res) => {
  Profiles.editView(db.connection, req.params.id, (err, rows) => {
    if (!err) res.render('editprofiles', {data: rows});
    else console.log(err);
  });
});

router.post('/edit/:id', (req, res) => {
  Profiles.edit(db.connection, req.body, req.params.id, err => {
    if (!err) res.redirect('profiles');
    else console.log(err);
  });
});

// delete
router.get('/delete/:id', (req, res) => {
  Profiles.del(db.connection, req.params.id, (err, rows) => {
    if (!err) res.redirect('/profiles');
    else console.log(err);
  })
})

module.exports = router;
