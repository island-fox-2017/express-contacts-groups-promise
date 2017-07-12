var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Address = require('../models/address');

let dbModel = new DbModel('data.db');


//=============================================================
// ADDRESS START HERE
// GET   | /address            | tampilin address
// router.get('/', function(req, res){
//   Address.findAllAddress(dbModel.connection, function(err,rows){
//     if(!err) {
//       Address.forDropdown(dbModel.connection, function(err, rowsDropdown){
//         res.render('address', {
//         panggilData: rows,
//         panggilDataDropdown: rowsDropdown
//         })
//       })
//     }
//   })
// })

// promise e
router.get('/', function(req,res) {
  Address.findAllAddress(dbModel.connection)
  .then(function(data1){
    return Address.forDropdown(dbModel.connection)
    .then(function(data2){
      res.render('address', {
      panggilData: data1,
      panggilDataDropdown: data2
      })
      })
    })
  })















// POST   | /address            | Untuk input address
router.post('/', function(req,res){
  Address.insertAddress(dbModel.connection, req.body)
  res.redirect('/addresses')
})

// GET    | /addresses/edit/:id   | Menampilkan data address spesifik untuk diubah
// POST   | /addresses/edit/:id   | Menerima data form untuk update address
router.get('/edit/:id', function(req, res){
  Address.findByIdAddress(dbModel.connection, req.params, function(err,rows){
    if(!err) {
      res.render('editaddress', {
        panggilData: rows
      })
    }
  })
})

router.post('/edit/:id', function(req, res){
  Address.updateAddress(dbModel.connection, req.body, req.params)
  res.redirect('/addresses');
})

// GET    | /addresses/delete/:id | Menghapus data address berdasarkan id
router.get('/delete/:id', function(req,res){
  Address.deleteAddress(dbModel.connection, req.params)
res.redirect('/addresses');
})


module.exports = router
