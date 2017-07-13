const express = require('express');
const app = express();
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

//FUNCTION LIBRARY
let library = require('./library'); //Lib of functions
let DbModel = require('./models/DbModel'); //Lib of db_model functions with instantiate
let Contact = require('./models/contacts'); //Lib of Contact class functions without instantiate
let Group = require('./models/groups'); //Lib of Groups class functions without instantiate
let Profile = require('./models/profiles'); //Lib of Profiles class functions without instantiate

let db = new sqlite.Database('./db/data.db');
let dbModel = new DbModel('./db/data.db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'ejs');

//=======================================================================//

//HOME PAGE
app.get('/', (req, res) => {
  res.render('index');
});

//================================CONTACTS ~ MODELED=======================================//

//CONTACTS PAGE ~~~~~~
app.get('/contacts', (req, res) => {
  Contact.findAll(dbModel.connection, function(err, rows) {
    if (!err) {
      res.render('contacts', {
        data_contacts: rows
      });
    }
  });
});

//FORM ~~~~~~
app.post('/contacts', (req, res) => {
  Contact.insertContacts(dbModel.connection, req.body);
  // library.insertContacts(req.body);

  res.redirect('/contacts');
});

//EDIT CONTACTS PAGE ~~~~~~
app.get('/contacts/edit/:id', (req, res) => {
  //RUN QUERY
  Contact.allContacts(dbModel.connection, req.params.id, (err, rows) => {
    if (!err) {
      res.render('edit_contacts', {
        data_contacts: rows
      });
    }
  });
});

app.post('/contacts/edit/:id', (req, res) => {
  Contact.editContacts(dbModel.connection, req.body);

  res.redirect('/contacts');
});

//DELETE CONTACTS ~~~~~~
app.get('/contacts/delete/:id', (req, res) => {
  Contact.removeContacts(dbModel.connection, req.params.id);

  res.redirect('/contacts');
})

//===============================GROUPS ~ MODELED========================================//

//GROUPS PAGE ~~~~~~
app.get('/groups', (req, res) => {
  //RUN QUERY
  Group.findAll(dbModel.connection, (err, rows) => {
    if (!err) {
      res.render('groups', {
        data_groups: rows
      });
    }
  });
});

//FORM ~~~~~~
app.post('/groups', (req, res) => {
  Group.insertGroups(dbModel.connection, req.body);

  res.redirect('/groups');
});

//EDIT GROUPS PAGE
app.get('/groups/edit/:id', (req, res) => {
  //RUN QUERY
  Group.allGroups(dbModel.connection, req.params.id, (err, rows) => {
    if (!err) {
      res.render('edit_groups', {
        data_groups: rows
      });
    }
  });
});

app.post('/groups/edit/:id', (req, res) => {
  Group.editGroups(dbModel.connection, req.body);

  res.redirect('/groups');
});

//DELETE GROUPS
app.get('/groups/delete/:id', (req, res) => {
  Group.removeGroups(dbModel.connection, req.params.id);

  res.redirect('/groups');
});

//===============================PROFILES ~ MODELED========================================//

//PROFILES PAGE
app.get('/profiles', (req, res) => {
  //RUN QUERY
  Profile.findAll(dbModel.connection, (err, rows) => {
    if (!err) {
      res.render('profiles', {
        data_profiles: rows
      });
    };
  });
});

//ADD PROFILES
app.get('/profiles/add', (req, res) => {
  Profile.addFindAll(dbModel.connection, (err, rows) => {
    if (!err) {
      res.render('profiles_add', {
        data_contacts: rows
      });
    };
  });
});

//FORM AT ADD PROFILES
app.post('/profiles/add', (req, res) => {
  Profile.insertProfiles(dbModel.connection, req.body);

  res.redirect('/profiles');
});

//EDIT PROFILES PAGE
app.get('/profiles/edit/:id', (req, res) => {
  //RUN QUERY
  let id = req.params.id;

  Profile.findAllProfiles(dbModel.connection, id)
  .then(function(data_profiles) {
    Profile.findAllContacts(dbModel.connection)
    .then(function(data_contacts) {
      res.render('edit_profiles', {
        data_profiles : data_profiles,
        data_contacts : data_contacts
      });
    });
  });
}); //app.get

app.post('/profiles/edit/:id', (req, res) => {
  Profile.editProfiles(dbModel.connection, req.body);

  res.redirect('/profiles');
});

//GET CONTACT DETAILS FROM PROFILES
app.get('/profiles/contacts/:id', (req, res) => {
  Profile.allProfilesContacts(dbModel.connection, req.params.id, function(err, rows) {
    res.render('profiles_contact', {
      data_join : rows
    });
  });
});

//DELETE PROFILES
app.get('/profiles/delete/:id', (req, res) => {
  Profile.removeProfiles(dbModel.connection, req.params.id);

  res.redirect('/profiles');
});

// //===============================ADDRESSES========================================//
//
// //ADDRESSES PAGE
// app.get('/addresses', (req, res) => {
//   //RUN QUERY
//   db.all("SELECT * FROM Addresses;", (err, data) => {
//     res.render('addresses', {
//       data_addresses: data
//     });
//   });
// });
//
// //ADD ADDRESSES
// app.get('/addresses/add', (req, res) => {
//   db.all("SELECT * FROM Contacts;", (err, data) => {
//     res.render('addresses_add', {
//       data_contacts: data
//     });
//   });
// });
//
// //FORM AT ADD ADDRESSES
// app.post('/addresses/add', (req, res) => {
//   library.insertAddresses(req.body);
//
//   res.redirect('/addresses');
// });

//ADDRESSES PAGE
app.get('/addresses', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Addresses;", (err, data) => {
        res.render('addresses', {data_addresses : data});
    });
});

//ADD ADDRESSES
app.get('/addresses/add', (req, res) => {
    db.all("SELECT * FROM Contacts;", (err, data) => {
        res.render('addresses_add', {data_contacts : data});
    });
});

//FORM AT ADD ADDRESSES
app.post('/addresses/add', (req, res) => {
    library.insertAddresses(req.body);

    res.redirect('/addresses');
    });

//EDIT ADDRESSES PAGE
app.get('/addresses/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}';`, (err, data_addresses) => {
      db.all(`SELECT * FROM Contacts;`, (err, data_contacts) => {
        res.render('edit_addresses', {data_addresses : data_addresses, data_contacts : data_contacts});
      });
    });
});

app.post('/addresses/edit/:id', (req, res) => {
    library.editAddresses(req.body);

    res.redirect('/addresses');
});

//DELETE PROFILES
app.get('/addresses/delete/:id', (req, res) => {
    library.removeAddresses(req.params.id);

    res.redirect('/addresses');
});

//=======================================================================//

//CONTACTSGROUPS
app.get('/contactsgroups', (req, res) => {
  db.all("SELECT cg.id AS cg_id, cg.contacts_id, cg.groups_id, c.id AS contact_id, c.name, c.company, c.telp_number, c.email, g.id AS group_id, g.name_of_group FROM Contacts_Groups AS cg INNER JOIN Contacts AS c ON cg.contacts_id  = c.id INNER JOIN Groups AS g ON cg.groups_id = g.id;", (err, data) => {
      res.render('contacts', {data_contacts : data});
  });
})




//LISTEN PORT
app.listen(3000, function() {
  console.log('im listening on 3000');
});
