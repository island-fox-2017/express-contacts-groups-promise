var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var combinedcg = require('../models/combinedcg');
var Group = require('../models/group');


router.get('/', function(req, res){
  combinedcg.findAll(DBmodel.connection)
  .then (function (rows) {
    let data = formatGroups(rows);
    res.render('combinedcg', {data_combinedcg: data});
  });
});

router.get('/delete/:id', function(req, res){
  combinedcg.deleteCont(DBmodel.connection, req.params.id);
  Group.deleteCont(DBmodel.connection, req.params.id);
  res.redirect('/combinedcg');
});

//parsing object
function formatGroups(obj){
  let result = [];
  let check = {};
  for(let i = 0; i < obj.length; i++)
  {
    let tempObj = {}
      for(let j = 0; j < obj.length; j++)
      {
          if(!check[obj[i].GroupName])
          {
            tempObj['GroupID'] = obj[i].GroupID;
            tempObj['GroupName'] = obj[i].GroupName;
            tempObj['Name'] = [];
            check[obj[i].GroupName] = true;
            result.push(tempObj);
          }
      }
  }

  for(let i = 0; i < result.length; i++)
  {
      for(let j = 0; j < obj.length; j++)
      {
        if(result[i].GroupName == obj[j].GroupName)
        {
          result[i].Name.push(obj[j].Name);
        }
      }
  }
  return result
}


module.exports = router;
