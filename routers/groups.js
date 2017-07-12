var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Group = require('../models/groups');
const ContactGroup = require('../models/contactgroup');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  Group.forDetailGroups(dbModel.connection, function (err, rows) {
    if (!err) {
      let datas = detailGroups(rows);
      res.render('groups', {data: datas})
    }
  })
})

router.post('/', function(req, res) {
  Group.insertDataGRoups(dbModel.connection, req.body);
  res.redirect('/groups');
});

router.get('/edit/:id', function(req, res) {
  Group.showDataGroupsById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      res.render('group-edit', {data:rows})
    }
  })
})

router.post('/update/:id', function(req, res) {
  Group.updateDataGroupsById(dbModel.connection, req.body, req.params.id);
  res.redirect('/groups')
})

router.get('/delete/:id', function(req, res) {
  Group.deleteDataGroupsById(dbModel.connection, req.params.id);
  ContactGroup.deleteDataContactGroupById(dbModel.connection, req.params.id);
  res.redirect('/groups');
})

function detailGroups(obj){
  let result = [];
  let check = {};

  for (let i = 0; i < obj.length; i++) {
    let tempObj = {}
    for(let j = 0; j < obj.length; j++) {
      if(!check[obj[i].name_group]) {
        tempObj['id'] = obj[i].id;
        tempObj['name_group'] = obj[i].name_group;
        tempObj['long_name'] = [];
        check[obj[i].name_group] = true;
        result.push(tempObj);
      }
    }
  }

  for(let i = 0; i < result.length; i++) {
    for(let j = 0; j < obj.length; j++) {
      if(result[i].name_group == obj[j].name_group) {
        result[i].long_name.push(obj[j].long_name);
      }
    }
  }
  return result
}

module.exports = router
