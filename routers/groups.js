var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Group = require('../models/group');

let dbModel = new DbModel('data.db');


// GROUPS - v 1

//==================
// GET    | /groups            | Menampilkan semua data groups
// router.get('/', function(req,res) {
//   Group.findAllGroups(dbModel.connection, function(err,rows){
//     if(!err) {
//       res.render('groups', {
//         panggilData: rows
//       })
//     } else {
//       res.send(err)
//     }
//   })
// })

//promise find all
router.get('/', function(req,res) {
  Group.findAllGroups(dbModel.connection)
  .then(function(data){
    console.log(data);
    res.render('groups', {
      panggilData: data  })
  })
})
//===============

// POST   | /groups            | Untuk input group
router.post('/', function(req, res){
  Group.insertGroups(dbModel.connection, req.body)
  res.redirect('/groups')
})


//=======================
// GET    | /groups/edit/:id   | Menampilkan data group spesifik untuk diubah
// POST   | /groups/edit/:id   | Menerima data form untuk update group
// router.get('/edit/:id', function(req,res){
//   Group.findByIdGroups(dbModel.connection, req.params, function(err,rows){
//     if(!err) {
//       res.render('editgroup', {
//         panggilData: rows
//       })
//     }
//   })
// })

// promise for findByIdGroups
router.get('/edit/:id', function(req, res){
  Group.findByIdGroups(dbModel.connection, req.params)
  .then(function(data){
    res.render('editgroup', {
      panggilData: data
    })
  })
})



//=======================

router.post('/edit/:id', function(req,res){
  Group.updateGroups(dbModel.connection, req.body, req.params)
  res.redirect('/groups');
})

// GET    | /groups/delete/:id | Menghapus data group berdasarkan id
router.get('/delete/:id', function(req, res){
  Group.deleteGroups(dbModel.connection, req.params)
  res.redirect('/groups');
})
//=======================

module.exports = router
