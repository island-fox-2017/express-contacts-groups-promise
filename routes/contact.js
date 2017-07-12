const express = require('express');
const DbModel = require('../models/DbModel')
const Contact = require('../models/contact')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')

router.get('/', function(req, res){
  Contact.findAll(dbModel.connection, function(err, rows){
    if(!err){
      res.render('contacts', {data_contact : rows})
    }
  })
})

router.post('/', function(req, res){
  Contact.create(dbModel.connection, req.body)
    res.redirect('/contacts')
})

router.get('/edit/:id', function(req, res){
  Contact.findById(dbModel.connection, req.params.id, function(err, rows){
    if(!err){
      res.render('editContacts', {dataContact : rows})
    }
  });
})

router.post('/edit/:id', function(req, res){
  Contact.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/contacts')
})

router.get('/delete/:id', function(req, res){
  Contact.destroy(dbModel.connection, req.params.id);
  res.redirect('/contacts');
})

// function deleteContact(id){
//   return new Promise(function(resolve, reject){
//     Contact.destroy(dbModel.connection, req.params.id, function(err, row){
//       if(!err){
//         resolve(row)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }
// 
// function deleteContactGroup(id){
//   return new Promise(function(resolve, reject){
//     Contact.destroyContactGroup(dbModel.connection, req.params.id, function(err, row){
//       if(!err){
//         resolve(row)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }
// 
// function deleteContactProfile(id){
//   return new Promise(function(resolve, reject){
//     Contact.destroyContactProfile(dbModel.connection, req.params.id, function(err, row){
//       if(!err){
//         resolve(row)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }
// 
// function deleteContactAddress(id){
//   return new Promise(function(resolve, reject){
//     Contact.destroyContactAddress(dbModel.connection, req.params.id, function(err, row){
//       if(!err){
//         resolve(row)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }
// 
// 
// router.get('/delete/:id', function(req, res, next){
//   let id = req.params.id
//   deleteContact(id)
//   .then(function(){
//     return deleteContactGroup(id)
//   })
//   .then(function(){
//     return deleteContactProfile(id)
//   })
//   .then(function(){
//     return deleteContactAddress(id)
//   })
//   .then(function(){
//     res.redirect('/contacts');
//   })
//   .catch()
// })

module.exports = router;
