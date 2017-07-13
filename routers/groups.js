'use strict'

const router = require('express').Router();

// database
const DbModel = require('../model/dbconnect.js');
let db = new DbModel('./db/data.db');

// model
const Groups = require('../model/groups');

// create
router.post('/', (req, res) => {
  Groups.add(db.connection, req.body, err => {
    if (!err) res.redirect('groups');
    else console.log(err);
  });
});

// read
router.get('/', (req, res) => {
  Groups.findAll(db.connection, (err, rows) => {
    if (!err) res.render('groups', {data: rows});
    else console.log(err);
  });
});

// update
router.get('/edit/:id', (req, res) => {
  Groups.editView(db.connection, req.params.id, (err, rows) => {
    if (!err) res.render('editgroups', {data: rows});
    else console.log(err);
  });
});

router.post('/edit/:id', (req, res) => {
  Groups.edit(db.connection, req.body, req.params.id, err => {
    if (!err) res.redirect('groups');
    else console.log(err);
  });
});

// delete
router.get('/delete/:id', (req, res) => {
  Groups.del(db.connection, req.params.id, err => {
    if (!err) res.redirect('groups');
    else console.log(err);
  });
});


module.exports = router;

// app.get('/groups/delete/:id', function(req, res) {
//   db.run(`DELETE FROM Groups WHERE groupsid = ${req.params.id};`, function(err, rows) {
//     if (!err) res.send(`Group dengan ID : ${req.params.id} berhasil dihapus`);
//     else console.log(err);
//   })
// });
