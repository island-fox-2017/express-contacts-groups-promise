//ini adalah cara require express nya
var express = require('express')
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db')


const dbModel = require('./models/dbModel');
const Contact = require('./models/contact');
const Group = require('./models/group');
const Profile = require('./models/profile');
const Address = require('./models/address');
const MyGroup = require('./models/mygroups');


const index = require('./routers/index');
const contact = require('./routers/contact');
const group = require('./routers/group');
const profile = require('./routers/profile');
const address = require('./routers/address');
const mygroups = require('./routers/mygroups');

//biar bisa akses folder project
var path = require('path');
//pakai body parser
const bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

//panggil data
let dataModel = new dbModel('./db/data.db')
var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);

app.use('/', index);
app.use('/contacts', contact);
app.use('/groups', group);
app.use('/profile', profile);
app.use('/addresses', address);
app.use('/my-contact-groups', mygroups);


// app.get('/my-contact-groups', function (req, res) {
//   db.all(`SELECT * from CONTACT2017 AS c LEFT JOIN contact_group AS cg ON c.id = cg.contact_id LEFT JOIN GROUPS AS g ON cg.group_id = g.id`, function (err, data) {
//     db.all(`SELECT * from CONTACT2017`, function (err, datakontak) {
//       db.all(`select * from GROUPS`, function (err, datagroup) {
//         res.render('my_group', {grouping_data: data, datakontak: datakontak, datagroup: datagroup})
//       })
//     })
//   });
// })

// app.post('/my-contact-groups', function(req, res) {
//   db.run(`insert INTO contact_group (contact_id, group_id) VALUES (${req.body.contact_id}, ${req.body.group_id})`);
//   res.redirect('/my-contact-groups')
// })


app.listen(3000)

//createTable
// app.get('/create-table/contact', function (req, res) {
//   db.run('CREATE TABLE if not exists CONTACT2017 (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, phone INTEGER, email text)');
//   res.send('contact table created')
// })
// app.get('/create-table/group', function (req, res) {
//   db.run('CREATE TABLE if not exists GROUPS (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name text)');
//   res.send('group table created')
// })
//
//
// //insert dummy record
// app.get('/insert/data/contact', function(req, res){
//   db.run("INSERT INTO CONTACT2017 (name, company, phone, email) VALUES ('Achim Baggins', 'Hacktiv8 Indonesia', 081803704343, 'achim_baggins@yahoo.com')");  // res.send('Achim Baggins')
//   res.redirect('/contacts')
// })
// app.get('/insert/data/group', function(req, res){
//   db.run("INSERT INTO groups (group_name) VALUES ('Family')");  // res.send('Achim Baggins')
//   res.redirect('/groups')
// })

///////////////ROUTING DIRECTION
