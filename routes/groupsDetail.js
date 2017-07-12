const express = require('express');
const DbModel = require('../models/DbModel')
const GroupsDetail = require('../models/groupsDetail')

let router = express.Router()
let dbModel = new DbModel('./db/contact_group.db')


router.get('/', function(req, res){
  GroupsDetail.showGroupDetail(dbModel.connection, function(err, rows){
    if(!err){
      let datas = groupDetail(rows)
      res.render('groupsDetail', {data_group : datas})
    }
    // console.log(datas);
  })
})

function groupDetail(dataObject){
  let result = [];
  let check = {}
  for(let i = 0; i < dataObject.length; i++){
    let tempObj = {}
      for(let j = 0; j < dataObject.length; j++){
        if(!check[dataObject[i].name_of_group]){
          tempObj['id'] = dataObject[i].id;
          tempObj['name_of_group'] = dataObject[i].name_of_group;
          tempObj['name'] = [];
          check[dataObject[i].name_of_group] = true;
          result.push(tempObj)
        }
      }
  }

for(let i = 0; i < result.length; i++){
  for(let j = 0; j < dataObject.length; j++){
    if(result[i].name_of_group == dataObject[j].name_of_group){
      result[i].name.push(dataObject[j].name)
    }
  }
}
  return result;
}

module.exports = router;
