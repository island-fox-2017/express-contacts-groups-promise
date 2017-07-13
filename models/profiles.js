"use strict"

class Profiles {
  constructor() {

  };

  static findAll(db, callback) {
    db.all("SELECT * FROM Profiles;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  } //static

  //For dropdown menu, we use data from Contacts table
  static addFindAll(db, callback) {
    db.all("SELECT * FROM Contacts;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  } //static

  static insertProfiles(db, json) {
    let insertProfiles = `INSERT INTO Profiles (username, password, contact_id) VALUES ('${json.username}', '${json.password}', ${json.contact_id});`;

    db.run(insertProfiles);
  }; //static

  // static allProfiles(db, id, callback) {
  //   db.all(`SELECT * FROM Profiles WHERE id = '${id}';`, (err, data_profiles) => {
  //     db.all(`SELECT * FROM Contacts;`, (err, data_contacts) => {
  //       if (!err) {
  //         callback(false, data_profiles, data_contacts);
  //       } else {
  //         callback(true, null, null);
  //       }
  //     });
  //   });
  // }; //static

  static findAllProfiles(db, id) { //req.params.id
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM Profiles WHERE id = '${id}';`, (err, rows) => {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      });
    });
  }; //static promise

  static findAllContacts(db) {
    return new Promise(function(resolve, reject ) {
      db.all(`SELECT * FROM Contacts;`, (err, rows) => {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      });
    });
  }; //static promise

  static allProfilesContacts(db, id, callback) {
    db.all(`SELECT  Profiles.id, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Profiles.id = ${id};`, (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  };

  // //GET CONTACT DETAILS FROM PROFILES
  // app.get('/profiles/contacts/:id', (req, res) => {
  //   Profile.allProfilesContacts(dbModel.connection, req.params.id, function(err, rows) {
  //     res.render('profiles_contact', {
  //       data_join : rows
  //     });
  //   });
  //
  //   db.all(`SELECT  Profiles.id, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Profiles.id = ${req.params.id};`, (err, data) => {
  //     res.render('profiles_contact', {
  //       data_join: data
  //     });
  //   });
  // });

  static editProfiles(db, json) {
    let editProfiles = `UPDATE Profiles SET username = '${json.username}', password = '${json.password}', contact_id = ${json.contact_id} WHERE id = '${json.id}';`;

    db.run(editProfiles);
  };

  static removeProfiles(db, id) {
    let removeProfiles = `DELETE FROM Profiles WHERE id = '${id}';`;

    db.run(removeProfiles);
  };

}; //class

module.exports = Profiles;
