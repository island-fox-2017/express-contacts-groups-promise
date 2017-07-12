const express = require('express');
const dbModel = require('../Models/dbModels');
const dbContacts = require('../Models/dbContacts');
const dbGroups = require('../Models/dbGroups');
const dbContactsGroups = require('../Models/dbContactsGroups')

var router = express.Router();
var dbmodel = new dbModel('./db/contact_group.db');

router.get('/', function(req, res){
  dbContactsGroups.selectAll(dbmodel.conn)
    .then(function (rows1){
      dbContacts.selectAll(dbmodel.conn)
        .then(function(rows2){
          dbGroups.selectAll(dbmodel.conn)
          .then(function(rows3){
            res.render('contacts_groups', {header : 'This is Groups Contacts', dataContactsGroups : rows1, dataContacts : rows2, dataGroups : rows3})
          })
      })
    })
    .catch(function(){
      res.send(`ada error ${err}`)
    })
  })


router.post('/', function(req, res){
  dbContactsGroups.insert(dbmodel.conn, req.body);
  res.redirect('/contactsGroups')
});

// router.get('/delete/:id', function (req, res){
//   dbContactsGroups.delete(dbmodel.conn, req.params.id);
//   res.redirect('/contactsGroups');
// })

// router.get('/edit/:id', function (req, res){
//   dbContactsGroups.selectById(dbmodel.conn, req.params.id)
//     .then(function(rows1){
//       dbContacts.selectAll(dbmodel.conn)
//         .then(function(rows2){
//           dbGroups.selectAll(dbmodel.conn)
//             .then(function(rows3){
//               res.render('edit_contacts_groups', {header : 'Edit Contacts Groups Page', dataContactsGroups : rows1, dataContacts: rows2, dataGroups: rows3});
//             })
//         })
//     })
//     .catch(function(){
//       res.send(`ada error ${err}`);
//     })  
// })


// router.post('/edit/:id', function (req, res){
//   dbContactsGroups.update(dbmodel.conn, req.params.id, req.body);
//   res.redirect('/contactsGroups');
// })

module.exports = router;
