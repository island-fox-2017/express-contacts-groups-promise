'use strict'

class Groups {
  constructor() {}

  // create
  static add(db, data, callback) {
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${data.name_of_group}');`, err => {
      if (!err) callback(false);
      else callback(true);
    })
  }

  // read
  static findAll(db, callback) {
    db.all(`SELECT * FROM Groups;`, (err, rows) => {
      if (!err) callback(false, rows);
      else callback(true, null)
    });
  }

  // update
  static editView(db, usrId, callback) {
    db.all(`SELECT * FROM Groups WHERE groupsid = ${usrId};`, (err, rows) => {
      if (!err) callback(false, rows);
      else callback(true, null);
    });
  }

  static edit(db, data, usrId, callback) {
    db.run(`UPDATE Groups SET name_of_group = '${data.name_of_group}' WHERE groupsid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

  // delete
  static del(db, usrId, callback) {
    db.run(`DELETE FROM Groups WHERE groupsid = ${usrId};`, err => {
      if (!err) callback(false);
      else callback(true);
    });
  }

} // class Groups

module.exports = Groups;
