'use strict'

class Contact {
  constructor() {}

  // create
  static add(db, data, callback) {

    db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}');`, (err, rows) => {
    console.log('xxx',rows);
      // db.run(`INSERT INTO ContactsGroups (contacts_id, groups_id) VALUES (${rows.contactsid}, ${data.groupsid})`, err => {
      //   if (!err) callback(false);
      //   else callback(true);
      // });
    });
  }

  // static add(db, data, callback) {
  //   db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}');`, err => {
  //     if (!err) callback(false);
  //     else callback(true);
  //   });
  // }

  // read
  static findAll(db, callback) {
    db.all('SELECT * FROM Contacts', (err, table) => {
      db.all('SELECT * From Groups', (err, dropList) => {
        // console.log(table);
        if (!err) callback(false, table, dropList);
        else callback(true, null, null);
      })
    });
  }

  // static findAll(db, callback) {
  //   db.all('SELECT * FROM Contacts', (err, rows) => {
  //     if (!err) callback(false, rows);
  //     else callback(true, null);
  //   });
  // }

  //update
  static editView(db, usrId, callback) {
    db.all(`SELECT * FROM Contacts WHERE contactsid = ${usrId};`, (err, rows) => {
      if (!err) callback(false, rows);
      else callback(true, null);
    })
  }

  static edit(db, data, usrId, callback) {
    db.run(`UPDATE Contacts SET name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' WHERE contactsid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  // delete
  static del(db, usrId, callback) {
    db.run(`DELETE FROM Contacts WHERE contactsid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    })
  }

}  // class Contact

module.exports = Contact;
