var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var contcombinedcg = require('../models/contcombinedcg');
var Contact = require('../models/contact');

router.get('/', function(req, res){
  contcombinedcg.findAll(DBmodel.connection)
  .then (function (rows) {
    let data = formatGroup(rows);
    res.render('contcombinedcg', {data_contcombinedcg: data});
  });
});

router.get('/delete/:id', function(req, res){
  contcombinedcg.deleteCont(DBmodel.connection, req.params.id);
  Contact.deleteCont(DBmodel.connection, req.params.id);
  res.redirect('/contcombinedcg');
});

//parsing object
function formatGroup(obj){
  let result = [];
  let check = {};
  for(let i = 0; i < obj.length; i++)
  {
    let tempObj = {}
      for(let j = 0; j < obj.length; j++)
      {
          if(!check[obj[i].Name])
          {
            tempObj['ContactID'] = obj[i].ContactID;
            tempObj['Name'] = obj[i].Name;
            tempObj['GroupName'] = [];
            check[obj[i].Name] = true;
            result.push(tempObj);
          }
      }
  }

  for(let i = 0; i < result.length; i++)
  {
      for(let j = 0; j < obj.length; j++)
      {
        if(result[i].Name == obj[j].Name)
        {
          result[i].GroupName.push(obj[j].GroupName);
        }
      }
  }
  return result
}


module.exports = router;
