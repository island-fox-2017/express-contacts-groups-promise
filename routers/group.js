var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Group = require('../models/group');


router.get('/', function(req, res){
    Group.findAll(DBmodel.connection)
    .then (function (rows) {
      res.render('group', {dataGroup: rows});
        })
      });

  //go to group form to add group
  router.get('/addgroup', function(req, res){
    res.render('groupaddform');
  });

  //add new group on database
  router.post('/addgroup', function(req, res){
    Group.AddNew(DBmodel.connection, req.body);
    res.redirect('/group');
  })

  //go to the group edit form
  router.get('/edit/:id', function(req, res){
    Group.edit(DBmodel.connection, req.params.id)
    .then (function (rows){
      res.render('groupedit', {dataGroup: rows});
    })
     });

  //edit data group from groupeditform
  router.post('/edit/:id', function(req, res){
    Group.updateEdit(DBmodel.connection, req.params.id, req.body);
    res.redirect('/group');
  })

  //delete data from group info interface
  router.get('/delete/:id', function(req, res){
    Group.deleteCont(DBmodel.connection, req.params.id);
    res.redirect('/group');
  });

module.exports = router;
