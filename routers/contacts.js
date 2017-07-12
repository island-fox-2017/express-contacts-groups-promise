var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Contact = require('../models/contacts');
const ContactProfile = require('../models/contact-profile');
const ContactAddress = require('../models/contact-address');

let dbModel = new dbmodel ('./db/data.db');

//promise
function manipulateContact(rows) {
  return new Promise (function (resolve, reject) {
    var promises = rows.map(row => {
      var sama = []
      return new Promise (function (resolve2, reject2) {
        Contact.findDataContactById(dbModel.connection, row.id, function (err, data_contact) {
          row['id_promise'] = data_contact.id;
          row['first_name_promise'] = data_contact.first_name;
          row['last_name_promise'] = data_contact.last_name;
          row['company_promise'] = data_contact.company;
          row['telp_number_promise'] = data_contact.telp_number;
          row['email_promise'] = data_contact.email;
          row['name_group_promise'] = row.name_group;
          resolve2(row)
        })
      })
    })

    Promise.all(promises)
    .then(function() {
      resolve(rows)
    })
  })
}

router.get('/', function (req, res) {
  Contact.forDetailGroup(dbModel.connection, function (err, rows) {
    if (!err) {
      manipulateContact(rows)
      .then(function (rows){
        let datas = detailContactGroups(rows);
        // console.log(datas);
        res.render('contacts', {data: datas})
      })
    }
  })
})

router.post('/', function(req, res) {
  Contact.insertDataContacts(dbModel.connection, req.body);
  res.redirect('/contacts');
});

router.get('/edit/:id', function(req, res) {
  Contact.showDataContactsById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      res.render('edit', {data:rows})
    }
  })
})

router.post('/update/:id', function(req, res) {
  Contact.updateDataContactsById(dbModel.connection, req.body, req.params.id);
  res.redirect('/contacts')
})

// function deleteContact(id) {
//   return new Promise(function(resolve, reject) {
//     Contact.deleteDataContacts(dbModel.connection, req.params.id, function (error, row) {
//       if (!error) {
//         resolve(row)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }
//
// function deleteContactGroup(id) {
//   return new Promise(function(resolve, reject) {
//     Contact.deleteDataContactGroupByContactId(dbModel.connection, req.params.id, function (error, row) {
//       if (!error) {
//         resolve(row)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }
//
// function deleteProfile(id) {
//   return new Promise(function(resolve, reject) {
//     Contact.deleteDataProfileByContactId(dbModel.connection, req.params.id, function (error, row) {
//       if (!error) {
//         resolve(row)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }
//
// function deleteAddress(id) {
//   return new Promise(function(resolve, reject) {
//     Contact.deleteDataAddressByContactId(dbModel.connection, req.params.id, function (error, row) {
//       if (!error) {
//         resolve(row)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  //
  // deleteContact(id)
  // .then(function() {
  //   return deleteContactGroup(id)
  // })
  // .then(function() {
  //   return deleteProfile(id)
  // })
  // .then(function() {
  //   return deleteAddress(id)
  // })
  // .then(function() {
  //   res.redirect('/contacts')
  // })
  // .catch()
  Contact.deleteDataContacts(dbModel.connection, req.params.id);
  Contact.deleteDataContactGroupByContactId(dbModel.connection, req.params.id);
  Contact.deleteDataProfileByContactId(dbModel.connection, req.params.id);
  Contact.deleteDataAddressByContactId(dbModel.connection, req.params.id);
  res.redirect('/contacts');
})

router.get('/detail_profile/:id', function(req, res) {
  ContactProfile.showDetailContactProfileByContactId(dbModel.connection, req.params.id, function(error, rows) {
    if (!error) {
      res.render('contact-profile', {data: rows})
    }
  })
});

router.get('/detail_address/:id', function(req, res) {
  ContactAddress.showDetailContactAddressByContactId(dbModel.connection, req.params.id, function(error, rows) {
    if (!error) {
      res.render('contact-address', {data: rows})
    }
  })
});

router.get('/details/:id', function(req, res){
  Contact.forDetailGroup(dbModel.connection, req.params.id, function(err, rows){
    let datas = detailContactGroups(rows);
    res.render('contact-detail', {data: datas});
  })
})

function detailContactGroups(obj){
  let result = [];
  let check = {};

  for (let i = 0; i < obj.length; i++) {
    let tempObj = {}
    for(let j = 0; j < obj.length; j++) {
      if(!check[obj[i].first_name]) {
        tempObj['id'] = obj[i].id;
        tempObj['first_name'] = obj[i].first_name;
        tempObj['last_name'] = obj[i].last_name;
        tempObj['company'] = obj[i].company;
        tempObj['telp_number'] = obj[i].telp_number;
        tempObj['email'] = obj[i].email;
        tempObj['name_group'] = [];
        check[obj[i].first_name] = true;
        result.push(tempObj);
      }
    }
  }

  for(let i = 0; i < result.length; i++) {
    for(let j = 0; j < obj.length; j++) {
      if(result[i].first_name == obj[j].first_name) {
        result[i].name_group.push(obj[j].name_group);
      }
    }
  }
  return result
}

module.exports = router
