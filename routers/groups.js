'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Groups = require('../models/groups');
const GroupsContacts = require('../models/groupsContacts');
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;

//groups ROUTING
router.get('/', function(req, res){
  Groups.findAll(connection)
  .then(function(rows){
    res.render('groups', {data:rows})
  })
})

router.post('/', function(req, res){
  Groups.insertData(connection, req.body)
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  Groups.deleteData(connection, req.params.id)
  res.redirect('/groups');
})

router.get('/edit/:id', function(req, res){
  Groups.findById(connection, req.params.id)
  .then(function(row){
    res.render('editGroups', {data:row});
  })
})

router.post('/edit/:id', function(req, res){
  Groups.updateData(connection, req.body, req.params.id)
  res.redirect('/groups')
})

router.get('/details', function(req, res){
  GroupsContacts.joinAll(connection)
  .then(function(rows){
    let datas = formatGroups(rows);
    res.render('groups-details', {data:datas})
  })
})


//parsing object
function formatGroups(obj){
  let result = [];
  let check = {};
  for(let i = 0; i < obj.length; i++)
  {
    let tempObj = {}
      for(let j = 0; j < obj.length; j++)
      {
          if(!check[obj[i].name_of_group])
          {
            tempObj['groups_id'] = obj[i].groups_id;
            tempObj['name_of_group'] = obj[i].name_of_group;
            tempObj['name'] = [];
            check[obj[i].name_of_group] = true;
            result.push(tempObj);
          }
      }
  }

  for(let i = 0; i < result.length; i++)
  {
      for(let j = 0; j < obj.length; j++)
      {
        if(result[i].name_of_group == obj[j].name_of_group)
        {
          result[i].name.push(obj[j].name);
        }
      }
  }
  return result
}


module.exports = router;
