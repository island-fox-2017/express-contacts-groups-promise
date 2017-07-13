var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const Contact = require('../models/contacts')

router.get('/', function(req,res){
  Contact.showAll(connect.dataBase, function(err,rows) {
    res.render('contact',{contactsInput : rows})
  })
  Contact.joinContacs(connect.dataBase,function(err,rows){
    console.log(rows);
  })
})
router.post('/',function(req, res){
  Contact.insertContact(connect.dataBase , req.body.name,req.body.company,req.body.phone,req.body.email)
  res.redirect('/contacts')
})
router.get('/delete/:id',function(req ,res) {
  Contact.deleteContact(connect.dataBase,req.params.id)
  res.redirect('/contacts');
})
router.get(`/edit/:id`,function (req,res) {
  Contact.showEdit(connect.dataBase, req.params.id, function(err,rows){
      res.render('edit',{editInput : rows })
  })
})
router.post('/edit/:id',function (req,res) {
  Contact.editInput(connect.dataBase , req.body.id ,req.body.name,req.body.company ,req.body.company,req.body.email)
  res.redirect('/contacts')
})
router.get('/show-address/:id', function(req, res) {
  Contact.showAddress(connect.dataBase,req.params.id,function(err,rows){
      res.render('show-address',{showAddress : rows })
  })
})

router.get('/contactsDetail',function(req,res) {
  Contact.joinContacs(connect.dataBase,function(err,rows) {
      //console.log(rows);
      let dataDetails = gabungContacs(rows)
      console.log(dataDetails);
      res.render('contactsDetail',{dataGroups : dataDetails})
  })
})

function gabungContacs(data){
  let result = [];
  let check = {};
  for(let i = 0; i < data.length; i++)
  {
    let tempObj = {}
      for(let j = 0; j < data.length; j++)
      {
        if(!check[data[i].name])
          {
            tempObj['id'] = data[i].id;
            tempObj['name'] = data[i].name;
            tempObj['company'] = data[i].company;
            tempObj['telp_number'] = data[i].telp_number;
            tempObj['email'] = data[i].email;
            tempObj['name_of_group'] = [];
            check[data[i].name] = true;
            result.push(tempObj);
          }
      }
  }

  for(let i = 0; i < result.length; i++) {
    for(let j = 0; j < data.length; j++) {
      if(result[i].name == data[j].name) {
        result[i].name_of_group.push(data[j].name_of_group);
      }
    }
  }
  return result
}
module.exports = router;
