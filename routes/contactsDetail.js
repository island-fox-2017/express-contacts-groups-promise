const express = require('express');
const DbModel = require('../models/DbModel')
const ContactsDetail = require('../models/contactsDetail')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')


router.get('/', function(req, res){
  ContactsDetail.showContactDetail(dbModel.connection, function(err, rows){
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
