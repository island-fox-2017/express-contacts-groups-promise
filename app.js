
const express = require('express')
const index = require('./routers/index')
const contacts = require('./routers/contacts')
const groups = require('./routers/groups')
const addresses = require('./routers/addresses')
const profiles = require('./routers/profiles')
const contactsgroups = require('./routers/contactsgroups')

var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);

 const DbModel = require('./models/dbmodel');
    // ambil2 class nya
// const Contact = require('./models/contact');
// const Address = require('./models/address');
// const Group = require('./models/group');
// const Profile = require('./models/profile')
// const ContactGroup = require('./models/contactgroup')
 let dbModel = new DbModel('./data.db');
  // dibikin jadi object


  app.use('/', index);
  app.use('/contacts', contacts);
  app.use('/groups', groups);
  app.use('/addresses', addresses);
  app.use('/profiles', profiles);
  app.use('/contactsgroups', contactsgroups);



//  untuk testing.. bikin dulu table e.. trus bikin dummy data / langsung bikin form/post
// 1. bikin table..
app.get('/bikintable', function (req,res){
  dbModel.createTableAll();
  res.send('table all created')
})

//2.
//`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('kokoh', 'argatex', 983242, 'k@gmail.com');`



// TESTing
// app.get('/test', function (req,res){
//   Contact.findAll(dbModel.connection, function(err, rows) {
//     if(!err) {
//       console.log(rows);
//       res.render('test', {
//         panggilData: rows
//       })
//       // blm keluar, soal blm ada datane..
//       // ok dah keluar datane.. datane berupa = array of object
//     }
//   })
// })


app.listen(3000)
