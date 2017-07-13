"use strict"

class Contact {
  constructor() {

  };
  static findAll(db, callback) {
    db.all("SELECT cg.id AS cg_id, cg.contacts_id, cg.groups_id, c.id AS contact_id, c.name, c.company, c.telp_number, c.email, g.id AS group_id, g.name_of_group FROM Contacts_Groups AS cg INNER JOIN Contacts AS c ON cg.contacts_id  = c.id INNER JOIN Groups AS g ON cg.groups_id = g.id;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  }; //static

  // static findAll(db, callback) {
  //   db.all("SELECT * FROM Contacts;", (err, rows) => {
  //     if (!err) {
  //       callback(false, rows);
  //     } else {
  //       callback(true, null);
  //     }
  //   }); //all
  // }; //static

  static insertContacts(db, json) {
    let insertContacts = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${json.name}', '${json.company}', '${json.telp_number}', '${json.email}');`;

    db.run(insertContacts);
  };

  static allContacts(db, id, callback) {
    db.all(`SELECT * FROM Contacts WHERE id = '${id}';`, (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  }; //static

  static editContacts(db, json) {
    let editContacts = `UPDATE Contacts SET name = '${json.name}', company = '${json.company}', telp_number = '${json.telp_number}', email = '${json.email}' WHERE id = '${json.id}';`;

    db.run(editContacts);
  };

  static removeContacts(db, id) {
    let removeContacts = `DELETE FROM Contacts WHERE id = '${id}';`;

    db.run(removeContacts);
  };

}; //class

module.exports = Contact;
