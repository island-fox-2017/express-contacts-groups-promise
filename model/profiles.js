'use strict'

class Profile {
  constructor() {}

  // create
  static add(db, data, callback) {
    db.run(`INSERT INTO Profiles (username, password, profilecontact) VALUES ('${data.username}', '${data.password}', ${data.profilecontact});`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  // read
  // static findAll(db, callback) {
  //   let tableQuery = `SELECT Profiles.profilesid, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Contacts.contactsid = Profiles.profilecontact;`;
  //   let dropListQuery = `SELECT Contacts.name, Contacts.contactsid FROM Contacts;`;
  //
  //   db.all(tableQuery, (err, table) => {
  //     db.all(dropListQuery, (err, dropList) => {
  //       // console.log(table);
  //       // console.log(dropList);
  //       if (!err) callback(false, table, dropList);
  //       else callback(true, null, null);
  //     });
  //   });
  // }

  static findAll(db, callback) {
    let tableQuery = `SELECT Profiles.profilesid, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Contacts.contactsid = Profiles.profilecontact;`

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

  // update
  static editView(db, usrId, callback) {
    db.all(`SELECT * FROM Profiles WHERE profilesid = ${usrId};`, (err, rows) => {
      if (!err) callback(false, rows);
      else callback(true, null);
    });
  }

  static edit(db, data, usrId, callback) {
    db.run(`UPDATE Profiles SET username = '${data.username}', password = '${data.password}', profilecontact = '${data.profilecontact}' WHERE profilesid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  // delete
  static del(db, usrId, callback) {
    db.run(`DELETE FROM Profiles WHERE profilesid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(err);
    });
  }

} // class Profiles

module.exports = Profile;
