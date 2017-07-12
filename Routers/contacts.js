const express = require('express');
const dbModel = require('../Models/dbModels');
const dbContacts = require('../Models/dbContacts');
const dbContactsGroups = require('../Models/dbContactsGroups');

var router = express.Router();
var dbmodel = new dbModel('./db/contact_group.db')

router.get('/', function (req, res){
  dbContacts.selectAll(dbmodel.conn)
    .then(function(rows){
      res.render('contacts', {header: 'This is contacts page', data_contacts : rows});
    })
    .catch(function(err){
      res.send(`Ada error : ${err}`);
    })
  })
        
//     
//     , function(err, rows){
//     if (!err) res.render('contacts', {header: 'This is contacts page', data_contacts : rows});
//     else res.send(`Ada error : ${err}`);
//   })
// })

router.post('/', function(req, res){
  dbContacts.insert(dbmodel.conn, req.body);
  res.redirect('/contacts')
})

router.get('/edit/:id', function (req, res){
  dbContacts.selectById(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('edit_contact', {header: 'Edit Contact Page', data_contacts : rows});
    else res.send(`ada error : ${err}`);
  });
});

router.post('/edit/:id', function(req, res){
  let dataForm = req.body;
  dbContacts.update(dbmodel.conn, req.params.id, dataForm);
  res.redirect('/contacts');
})

router.get('/delete/:id', function(req, res){
  dbContacts.delete(dbmodel.conn, req.params.id);
  dbContactsGroups.deleteConjContacts(dbmodel.conn, req.params.id);
  res.redirect('/contacts');
  });
    

router.get('/:id/address', function(req, res){
  dbContacts.selectContactAddress(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('show_addresses', {header: 'This is show address by id page',data_address : rows});
    else res.send(`ada error : ${err}`);
  })
})

router.get('/:id/groups', function(req, res){
  dbContacts.selectConjGroups(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('show_groups_by_id', {header: 'This is show groups by id page',data_groups : rows});
  })
})


module.exports = router;
