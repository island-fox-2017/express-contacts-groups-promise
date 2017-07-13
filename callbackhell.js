function deleteContact(id) {
  return new Promise(function(resolve, reject) {
    db.run(`DELETE FROM Contacts WHERE contact_id = ${id}`, function(err, rows) {
      if (!err) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
}

function deleteContactGroup(id) {
  return new Promise(function(resolve, reject) {
    db.run(`DELETE FROM contactgroup WHERE contact_id = ${id}`, function(err, rows) {
      if (!err) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
}

//CARA MANGGILNYA

app.get('/contacts/delete/:id', function(req, res, next) {
  let id = req.params.id;

  deleteContact(id)
  .then(function(data) { //data adalah rows dari resolve
    return deleteContactGroup(id)
  })
  .then(function() {
    return deleteProfile(id)
  })
  .then(function() {
    return deleteAddresses(id)
  })
  .then(function() {
    res.redirect('/contacts');
  })

});


//CALLBACKS WITH MODEL

function dropDownContact() {
  return new Promise(function(resolve, reject) {
    address.dropDownContact(db.connection, function(err, rows) {
      if (!err) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
}
console.log(dropDownContact());
function findById(param) {
  return new Promise(function(resolve, reject) {
    address.findById(db.connection, param, function(err, rows) {
      if (!err) {
        resolve(rows2)
      } else {
        reject(err)
      }
    })
  })
}
router.get('/edit/:id', function(req, res) {
  dropDownContact()
  .then(function(rows) {
    findById(req.params)
    .then(function(rows2) {
      res.render('address_edit', {name_contact: rows, data_address: rows})
    })
  //   return findById(id)
  // .then(function() {
    // })
  })
})
// router.get('/edit/:id', function(req, res) {
//   address.dropDownContact(db.connection, function(err1, rows1) {
//     address.findById(db.connection, req.params, function(err2, rows2) {
//       res.render('address_edit', {name_contact : rows1, data_address : rows2})
//     })
//   })
// })
