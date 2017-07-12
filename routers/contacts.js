'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Contacts = require('../models/contacts');
const GroupsContacts = require('../models/groupsContacts');
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;


//Contacts ROUTING
router.get('/', function(req, res){
  Contacts.findAll(connection)
  .then(function(rows){
    res.render('contacts', {data: rows})
  })
})

router.post('/', function(req, res){
  Contacts.insertData(connection, req.body)
  res.redirect('/contacts')
})

router.get('/delete/:id', function(req, res){
  Contacts.deleteData(connection, req.params.id);
  res.redirect('/contacts')
})

router.get('/edit/:id', function(req, res){
  Contacts.findById(connection, req.params.id)
  .then(function(row){
    res.render('editContacts', {data: row})
  })
})

router.post('/edit/:id', function(req, res){
  Contacts.updateData(connection, req.body, req.params.id)
  res.redirect('/contacts')
})

router.get('/address/:id', function(req, res){
  Contacts.joinToAddress(connection, req.params.id)
  .then(function(rows){
    res.render('addressDetails', {datas:rows})
  })
})

router.get('/details', function(req, res){
  GroupsContacts.joinAll(connection)
  .then(function(rows){
    let datas = formatGroups2(rows);
    res.render('contacts-details', {data: datas});
  })
})



function formatGroups2(obj){
  let result = [];
  let check = {};
  for(let i = 0; i < obj.length; i++)
  {
    let tempObj = {}
      for(let j = 0; j < obj.length; j++)
      {
          if(!check[obj[i].name])
          {
            tempObj['contacts_id'] = obj[i].contacts_id;
            tempObj['name'] = obj[i].name;
            tempObj['company'] = obj[i].company;
            tempObj['telp_number'] = obj[i].telp_number;
            tempObj['email'] = obj[i].email;
            tempObj['name_of_group'] = [];
            check[obj[i].name] = true;
            result.push(tempObj);
          }
      }
  }

  for(let i = 0; i < result.length; i++)
  {
      for(let j = 0; j < obj.length; j++)
      {
        if(result[i].name == obj[j].name)
        {
          result[i].name_of_group.push(obj[j].name_of_group);
        }
      }
  }
  return result
}


module.exports = router
