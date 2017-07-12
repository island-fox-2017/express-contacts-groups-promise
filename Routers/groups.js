const express = require('express');
const dbModel = require('../Models/dbModels');
const dbGroups = require('../Models/dbGroups');
const dbContactsGroups = require('../Models/dbContactsGroups');


var dbmodel = new dbModel('./db/contact_group.db')
var router = express.Router();

router.get('/', function(req, res){
  dbGroups.selectAll(dbmodel.conn)
    .then(function(rows){
      res.render('groups', {header : 'Groups Page', data_groups : rows });
    })
    .catch(function(){
      res.send(`ada error ${err}`);
    })
})  


router.post('/', function(req, res){
  dbGroups.insert(dbmodel.conn, req.body);
  res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  dbGroups.selectById(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('edit_group', {header : 'Edit Group Page', data_groups : rows});
    else res.send(`ada error ${err}`);
  })
})

router.post('/edit/:id', function(req, res){
  dbGroups.update(dbmodel.conn, req.params.id, req.body);
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  dbGroups.delete(dbmodel.conn, req.params.id);
  dbContactsGroups.deleteConjGroups(dbmodel.conn, req.params.id);
  res.redirect('/groups');
})

router.get('/:id/contacts', function(req, res){
  dbGroups.selectConjContacts(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('show_contacts_by_id', {header : 'this is group contacts by id', dataGroupContact : rows});
  })
})




module.exports = router;
