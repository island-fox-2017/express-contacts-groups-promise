var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const Groups = require('../models/groups')

router.get('/',function (req,res) {
    Groups.showAll(connect.dataBase, function(err,rows) {
      res.render('groups',{groupInput: rows })
      console.log(rows);
    })
})
router.post('/',function (req,res) {
  Groups.insertGroups(connect.dataBase, req.body.groupName)
  res.redirect("/groups")
})

router.get('/delete/:id',function (req,res) {
  Groups.deleteGroups(connect.dataBase, req.params.id)
  res.redirect('/groups')
})

router.get('/edit/:id',function (req,res) {
  Groups.showEdit(connect.dataBase,req.params.id,function(err, rows){
    res.render('editGroups',{editGroups: rows})
  })
})
router.post('/edit/:id',function (req,res) {
  Groups.editInput(connect.dataBase,req.body.id, req.body.name)
  res.redirect('/groups')
})

module.exports = router;
