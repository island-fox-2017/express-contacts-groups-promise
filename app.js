'use strict'


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const DbModel = require('./models/dbModels');
// const Contacts = require('./models/contacts');
// const Groups = require('./models/groups');
// const Address = require('./models/address');
// const Profiles = require('./models/profiles');
// const GroupsContacts = require('./models/groupsContacts');

let app = express();
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');


//ROUTING ROUTER
const index = require('./routers/index');
const contacts = require('./routers/contacts');
const groups = require('./routers/groups');
const profiles = require('./routers/profiles');
const address = require('./routers/address');
const groupsContacts = require('./routers/groupsContacts');
// ...
app.use('/', index);
//contacts
app.use('/contacts', contacts);
app.use('/contacts/delete/:id', contacts);
app.use('/contacts/edit/:id', contacts);
app.use('/contacts/address/:id', contacts);
app.use('/contacts/details', contacts);
//groups
app.use('/groups', groups);
app.use('/groups/delete/:id', groups);
app.use('/groups/edit/:id', groups);
app.use('/groups/details', groups);
//profiles
app.use('/profiles', profiles);
app.use('/profiles/delete/:id', profiles);
app.use('/profiles/edit/:id', profiles);
app.use('/profiles/details/:id', profiles);
//address
app.use('/address', address);
app.use('/address/delete/:id', address);
app.use('/address/edit/:id', address);
//groupscontacts -> conjunction table
app.use('/groups-contacts',  groupsContacts);
app.use('/groups-contacts/delete/:id',  groupsContacts);


//CREATE TABLE
app.get('/createTable', function(req,res){
  dbModel.createAllTable();
  res.send('table created~')
})



app.listen(3000);
