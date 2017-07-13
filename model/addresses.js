'use strict'

class Addresses {
  constructor() {}

  static add(db, data, callback) {
    db.run(`INSERT INTO Addresses (street, city, zip, addresscontact) VALUES ('${data.street}', '${data.city}', '${data.zip}', ${data.addresscontact});`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  // static findAll(db, callback) {
  //   let tableQuery = `select Addresses.addressesid, Addresses.street, Addresses.city, Addresses.zip, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email from Addresses inner join Contacts on Contacts.contactsid = Addresses.addresscontact;
  // `;
  //   let dropListQuery = `SELECT Contacts.name, Contacts.contactsid FROM Contacts;`;
  //
  //   db.all(tableQuery, (err, table) => {
  //     db.all(dropListQuery, (err, dropList) => {
  //       if (!err) callback(false, table, dropList);
  //       else callback(true, null, null);
  //     });
  //   });
  // }

  static findAll(db, callback) {
    let tableQuery = `select Addresses.addressesid, Addresses.street, Addresses.city, Addresses.zip, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email from Addresses inner join Contacts on Contacts.contactsid = Addresses.addresscontact;`

    return new Promise((resolve, reject) => {
      db.all(tableQuery, (err, table) => {
        if (!err) resolve(table);
        else reject(err);
      });
    });
  } // promise findAll

  static dropList(db, callback) {
    let dropListQuery = `SELECT Contacts.name, Contacts.contactsid FROM Contacts;`;

    return new Promise((resolve, reject) => {
      db.all(dropListQuery, (err, dropList) => {
        if (!err) resolve(dropList);
        else reject(err);
      });
    });
  } // promise dropList



  static editView(db, usrId, callback) {
    db.all(`SELECT * FROM Addresses WHERE addressesid = ${usrId};`, (err, rows) => {
      if (!err) callback(false, rows);
      else callback(true, null);
    });
  }

  static edit(db, data, usrId, callback) {
    db.run(`UPDATE Addresses SET street = '${data.street}', city = '${data.city}', zip = '${data.zip}', addresscontact = ${data.addresscontact} WHERE addressesid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  static del(db, usrId, callback) {
    db.run(`DELETE FROM Addresses WHERE addressesid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

} // class Adresses


// app.get('/addresses/delete/:id', function(req, res) {
//   db.run(`DELETE FROM Addresses WHERE addressesid = ${req.params.id};`, function(err, rows) {
//     if (!err) res.send(`Address dengan ID : ${req.params.id} berhasil dihapus`);
//     else console.log(err);
//   })
// });




module.exports = Addresses;