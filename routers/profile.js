var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const Profile = require('../models/profile')

router.get('/',function(req,res) {
  Profile.showProfile(connect.dataBase)
  .then(dataProfile =>{
    Profile.showContact(connect.dataBase)
    .then(dataContact=>{
      res.render('profile',{contactName : dataContact, profileInput : dataProfile})
    })
  })
})
router.post('/',function(req,res) {
  Profile.insertProfile(connect.dataBase,req.body.username,req.body.password,req.body.contactsList)
  res.redirect('/profile')
})
router.get('/edit/:id',function(req,res) {
  Profile.showEdit(connect.dataBase,req.params.id,function (err,edit,kontak) {
    res.render('editProfile',{contactName : kontak, editProfile : edit})
  })

})
router.post('/edit/:id',function (req,res) {
  Profile.editProfile(connect.dataBase,req.body.id,req.body.username,req.body.username,req.body.contact_id)
  res.redirect('/profile')
})
router.get('/delete/:id',function (req,res) {
  Profile.deleteProfile(connect.dataBase,req.params.id )
  res.redirect('/profile')
})

module.exports = router;
