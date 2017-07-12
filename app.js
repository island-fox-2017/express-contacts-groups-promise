var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// const ModelDb = require('./models/DbModel');
// const Contact = require('./models/contact');
// const dGroup = require('./models/groups');
// const dProfile = require('./models/profiles');
// const dAddr = require('./models/addresses');

const index = require ('./routers/index');
const kontak = require ('./routers/contacts');
const grup = require ('./routers/groups');
const profil = require ('./routers/profiles');
const alamat = require ('./routers/addresses');
const grup_kontak = require ('./routers/groups-contacts');

// let dbModel = new ModelDb('./db/data.db');
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/data.db');

app.set('view engine', 'ejs');
var path_name = path.join(__dirname, 'public');
var express_static = express.static(path_name);
app.use(express_static);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/contacts', kontak);
app.use('/groups', grup);
app.use('/profiles', profil);
app.use('/addresses', alamat);
app.use('/groups-contacts', grup_kontak);


// app.get('/create_table', function (req, res) {
//     db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number int, email text)");
//     db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text)");
//     db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, password text, contact_id INTEGER)");
//     db.run("CREATE TABLE IF NOT EXISTS Address (id INTEGER PRIMARY KEY AUTOINCREMENT, street text, city text, zip integer, contact_id INTEGER)");
//     db.run("CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id integer, group_id integer)");
//     res.send('table Contacts, Groups, Profile, & Address created');
// })

// app.get('/create_table', function (req, res) {
//     db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text)")
//     res.send('table Groups created');
// })



app.listen(3000)
