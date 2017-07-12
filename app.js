const express = require('express')
const app = express()
const bodyParser = require ('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')
// =================INDEX=======================================================
app.get('/',function(req,res) {
   res.render('index',{titleTask : 'Contact&Group'})
})
// ===========================CONTACS===========================================
var contacts = require('./routers/contacts')
app.use('/contacts',contacts)
//===================================GROUPS=====================================
var groups= require('./routers/groups')
app.use('/groups',groups)
// ===================================PROFILE===================================
var profile = require('./routers/profile')
app.use('/profile',profile)
// ===================================ADDRESS===================================
var address= require('./routers/address')
app.use('/address',address)
// ===================================ContactGroup==============================
var contactGroup = require('./routers/contactGroup')
app.use('/contactGroup',contactGroup)

app.listen(3000)
