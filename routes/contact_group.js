const express = require('express');
const DbModel = require('../models/DbModel')
const Contact_Group = require('../models/contact_group')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')


router.get('/', function(req, res){
  Contact_Group.findAll(dbModel.connection, function(err, rows){
    if(!err){
      res.render('contacts-groups', {ContactGroup : rows} )
    }
  })
})

router.post('/', function(req, res){
  Contact_Group.create(dbModel.connection, req.body)
  res.redirect('contacts-groups')
})

router.get('/edit/:id', function(req, res){
  Contact_Group.findById(dbModel.connection, req.params.id, function(err, rows){
    if(!err){
      res.render('editContactsGroups', {ContactGroup : rows})
    }
  })
})

router.post('/edit/:id', function(req, res){
  Contact_Group.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/contacts-groups')
})


router.get('/delete/:id', function(req, res){
  Contact_Group.destroy(dbModel.connection, req.params.id);
  res.redirect('/contacts-groups')
})


router.get('/contactsDetail', function(req, res){
  Contact_Group.showContactDetail(dbModel.connection, function(err, rows){
    if(!err){
      let datas = contactDetail(rows)
      res.render('contactsDetail', {data_contact : datas})
    }
    // console.log(datas);
  })
})

function contactDetail(obj) {
  let result = [];
  let check = {};
  for(let i = 0; i < obj.length; i++){
    let tempObj = {};
      for(let j = 0; j < obj.length; j++){
        if(!check[obj[i].name]){
          tempObj['id'] = obj[i].id;
          tempObj['name'] = obj[i].name;
          tempObj['company'] = obj[i].company;
          tempObj['telp_number'] = obj[i].telp_number;
          tempObj['email'] = obj[i].email;
          tempObj['name_of_group'] = [];
          check[obj[i].name] = true;
          result.push(tempObj)
        }
      }
  }
  
  for(let i = 0; i < result.length; i++){
    for(let j = 0; j < obj.length; j++){
      if(result[i].name == obj[j].name){
        result[i].name_of_group.push(obj[j].name_of_group);
      }
    }
  }
  return result;
}

module.exports = router;
