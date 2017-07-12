'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const DbModel = require('./models/DbModel');

const Index = require('./routers/index');
const Contact = require('./routers/contact');
const Group = require('./routers/group');
const Profile = require('./routers/profile');
const Address = require('./routers/address');
const Contact_Group = require('./routers/contact_group');

//let myQuery = require('./myQuery.js');

let dbModel = new DbModel('./db/data.db');
let db = new sqlite3.Database('./db/data.db');
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', Index);
app.use('/contacts', Contact);
app.use('/groups', Group);
app.use('/profiles', Profile);
app.use('/address', Address);
app.use('/contacts-groups', Contact_Group);

app.listen(3003);
