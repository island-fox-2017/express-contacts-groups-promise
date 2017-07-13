"use strict"

class Groups {
  constructor() {

  };

  static findAll(db, callback) {
    db.all("SELECT * FROM Groups;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  }; //static

  static insertGroups(db, json) {
    let insertGroups = `INSERT INTO Groups (name_of_group) VALUES ('${json.name_of_group}');`;

    db.run(insertGroups);
  };

  static allGroups(db, id, callback) {
    db.all(`SELECT * FROM Groups WHERE id = '${id}';`, (err, rows) => {
       if (!err) {
         callback(false, rows);
       } else {
         callback(true, null);
       }
    }); //all
  }; //static

  static editGroups(db, json) {
    let editGroups = `UPDATE Groups SET name_of_group = '${json.name_of_group}' WHERE id = '${json.id}';`;

    db.run(editGroups);
  };

  static removeGroups(db, id) {
    let removeGroups = `DELETE FROM Groups WHERE id = '${id}';`;

    db.run(removeGroups);
  };

}; //class

module.exports = Groups;
