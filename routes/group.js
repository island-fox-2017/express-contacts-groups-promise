const express = require('express');
const DbModel = require('../models/DbModel')
const Group = require('../models/group')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')

router.get('/', function(req, res){
  Group.findAll(dbModel.connection, function(err, rows){
    if(!err){
      res.render('groups', {data_group : rows})
    }
  })
})

router.post('/', function(req, res){
  Group.create(dbModel.connection, req.body)
    res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  Group.findById(dbModel.connection, req.params.id, function(err, rows){
    if(!err){
      res.render('editGroups', {dataGroup : rows})
    }
  });
})

router.post('/edit/:id', function(req, res){
  Group.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/groups')
})

router.get('/delete/:id', function(req, res){
  Group.destroy(dbModel.connection, req.params.id);
  res.redirect('/groups');
})

module.exports = router;
