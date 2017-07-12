const express = require('express');
const dbModel = require('../Models/dbModels');
const dbProfiles = require('../Models/dbProfiles');
const dbContacts = require('../Models/dbContacts');


var router = express.Router();
var dbmodel = new dbModel('./db/contact_group.db')

router.get('/', function(req, res){
  dbProfiles.selectProfileJoinContact(dbmodel.conn)
  .then(function(rows1){
    dbContacts.selectAll(dbmodel.conn)
    .then(function(rows2){
      res.render('profiles', {header : 'Profiles Page', data_profiles : rows1, data_contacts : rows2});
    })
  })
  .catch(function(){
    res.send(`ada error ${err}`);
  })
})
//   dbProfiles.selectProfileJoinContact(dbmodel.conn, function(err, rows1){
//     dbContacts.selectAll(dbmodel.conn, function(err, rows2){
//       res.render('profiles', {header : 'Profiles Page', data_profiles : rows1, data_contacts : rows2});
//     })
//   })
// })

router.post('/', function(req, res){
  dbProfiles.insert(dbmodel.conn, req.body);
  res.redirect('/profiles');
})

router.get('/edit/:id', function(req, res){
  dbProfiles.selectById(dbmodel.conn, req.params.id)
  .then(function(rows1){
    dbContacts.selectAll(dbmodel.conn)
    .then(function(rows2){
      res.render('edit_profiles', {header : 'Edit Profiles Page',data_profiles : rows1, data_contacts: rows2});
    })
  })
  .catch(function(){
    res.send(`ada error ${err}`);
  })
})
  
//   
//   dbProfiles.selectById(dbmodel.conn, req.params.id, function(err, rows1){
//     dbContacts.selectAll(dbmodel.conn, function(err, rows2){
//       if(!err) res.render('edit_profiles', {header : 'Edit Profiles Page',data_profiles : rows1, data_contacts: rows2});
//       else res.send(`ada error ${err}`)
//     })
//   })
// })

router.post('/edit/:id', function(req, res){
  dbProfiles.update(dbmodel.conn, req.params.id, req.body);
  res.redirect('/profiles');
})

router.get('/delete/:id', function(req, res){
  dbProfiles.delete(dbmodel.conn, req.params.id);
  res.redirect('/profiles');
})





module.exports = router;
