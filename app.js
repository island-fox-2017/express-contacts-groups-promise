'use strict'

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')

// database
const DbModel = require('./model/dbconnect.js')
let db = new DbModel('./db/data.db')

// model
const Contacts = require('./model/contacts')
const Addresses = require('./model/addresses')
const Groups = require('./model/groups')
const Profiles = require('./model/profiles')


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// routing
const index = require('./routers/index');
const addresses = require('./routers/addresses');
const contacts = require('./routers/contacts');
const groups = require('./routers/groups');
const profiles = require('./routers/profiles');

app.use('/', index);
app.use('/addresses', addresses);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/profiles', profiles);

app.listen(3000, () => {
  console.log('listening on port 3000...')
});
