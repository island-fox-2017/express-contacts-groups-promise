var express = require('express');
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Contact = require('../models/contact');

let dbModel = new DbModel('data.db');
// hati2 utk dbModel yg ini pathnya di project... ( kynya soal sqlite3 disini jg)
// sedang yg lain => spt biasa


// CONTACTS HERE - v 1
// GET    | /contacts            | Menampilkan semua data contacts
// router.get('/', function(req,res) {
//   Contact.findAllContact(dbModel.connection, function(err,rows){
//     if(!err) {
//       res.render('contacts', {
//         panggilData: rows
//       })
//     } else {
//       console.log(err);
//       res.send(err)
//     }
//   })
// })
// promise findAll contact
// router.get('/', function(req,res) {
//   Contact.findAllContact(dbModel.connection)
//   .then(function(data){
//     //console.log(data);
//     res.render('contacts', {
//       panggilData: data  })
//   })
// })

//================================================================
// input group in contacts ( in object ) - manipulasi object rows
router.get('/', function (req, res) {
  Contact.showGroupObject(dbModel.connection)
  .then(function(data) {
    console.log(data);
    console.log('aaa',data[0]);
    console.log('ccc', data[1]); // data join table
        // array of object ( group )
        console.log('bbb', data[0].length);
        console.log('ddd', data[0][1].name_of_group);
        console.log('eee', data[0][1].name_of_group);
    for (let i = 0; i < data[0].length; i++) {
      data[1][i].name_of_group = [];
      for (let j = 0; j < data[1].length; j++) {
        if(data[0][i].id === data[1][j].contact_id) {
          data[0][i].name_of_group.push(data[1][j].name_of_group)
        }
      }
    }
    console.log('----',data[0]);
    //-----
    // return Contact.showAddressInContact(dbModel.connection, req.params.id)
    // .then(function(data2){
    //   console.log('xxx',data2);
      res.render('contacts', {
        panggilData: data[0]
        // panggilDataAddress: data2
      });
    // })
  })
});














// POST   | /contacts            | Untuk input contact
router.post('/', function(req, res){
  Contact.insertContact(dbModel.connection, req.body)
  res.redirect('/contacts')
})
// no callback no promise

// GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
// POST   | /contacts/edit/:id   | Menerima data form untuk update contact
// router.get('/edit/:id', function(req,res){
//   Contact.findByIdContact(dbModel.connection, req.params, function(err,rows){
//     if(!err) {
//       res.render('editcontact', {
//         panggilData: rows
//       })
//     }
//   })
// })

router.get('/edit/:id', function(req, res){
  Contact.findByIdContact(dbModel.connection, req.params)
  .then(function(data){
    res.render('editcontact', {
      panggilData: data
    })
  })
})











router.post('/edit/:id', function(req,res){
  Contact.updateContact(dbModel.connection, req.body, req.params)
  res.redirect('/contacts');
})

// GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
router.get('/delete/:id', function(req, res){
  Contact.deleteContact(dbModel.connection, req.params)
  res.redirect('/contacts');
})

//show_address
router.get('/addresses/:id', function(req, res){
  Contact.showAddress(dbModel.connection, req.params, function(err, rows){
    res.render('addressaja', {panggilData: rows});
  })
})

module.exports = router
