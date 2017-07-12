const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var dbmodel = require('./models/dbModels');
var DBmodel = new dbmodel('./db/data.db');
var Contact = require('./models/contact');
var Group = require('./models/group');
var Address = require('./models/address');
var Profile = require('./models/profile');
var Cg = require('./models/cg');
var combinedcg = require('./models/combinedcg');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var path_name = path.join(__dirname, 'public');
var express_static = express.static(path_name);

app.get('/createTable', function(req,res) {
  DBmodel.createAllTable()
  res.send('create all table');
})

const home = require('./routers/home')
const contacts = require('./routers/contact')
const groups = require('./routers/group')
const addresses = require('./routers/address')
const profiles = require('./routers/profile')
const contactandgroups = require('./routers/contactandgroup')
const combinedcgs = require('./routers/combinedcg')
const contcombinedcgs = require('./routers/contcombinedcg')

app.use('/home', home);
app.use('/contact', contacts);
app.use('/group', groups);
app.use('/address', addresses);
app.use('/profile', profiles);
app.use('/contactandgroup', contactandgroups);
app.use('/combinedcg', combinedcgs);
app.use('/contcombinedcg', contcombinedcgs);

app.listen(3000);
