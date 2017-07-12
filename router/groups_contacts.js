var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');
const ContactsGroups = require('../models/contacts_groups');
const contact = require('../models/contacts');
const group = require('../models/groups');

router.get('/', function(req, res) {
  ContactsGroups.show3Join(db.connection, function(err, rows) {
    let olah = formatGroups(rows);
    res.render('groups_contacts', {data: olah})
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

module.exports = router