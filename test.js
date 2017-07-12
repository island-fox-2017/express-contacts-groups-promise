const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contact_group.db'); //posisi dilihat dari folder project

const index = require('./routes/index');
const address = require('./routes/address')
const contacts = require('./routes/contact')
const groups = require('./routes/group')
const profiles = require('./routes/profile')

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/profiles', profiles);
app.use('/address', address);


app.listen(3000)
