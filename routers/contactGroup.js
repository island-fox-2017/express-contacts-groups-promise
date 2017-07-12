var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const ContactGroup = require('../models/contactGroup')
router.get('/',function(req,res){
  ContactGroup.joinCG(connect.dataBase)
  .then(contactGroup =>{
    ContactGroup.showContact(connect.dataBase)
    .then(kontak =>{
      ContactGroup.showGroups(connect.dataBase)
      .then(groups =>{
        res.render('contactGroup',{groupInput : contactGroup, contactName : kontak, groupName : groups})
      })
    })
  })
  .catch(function() {
    console.log(err);
  })

})
router.post('/',function(req,res){
    ContactGroup.insert(connect.dataBase,req.body)
    res.redirect('/contactGroup')
})
router.get('/delete/:id',function(req,res){
  ContactGroup.delete(connect.dataBase,req.params.id)
  res.redirect('/contactGroup')
})

module.exports = router;
