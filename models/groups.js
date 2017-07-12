const ModelDb = require('./DbModel');

class Groups {
  constructor(data) {
    // this.id = data.id;
    // this.name = data.name_of_group;

  }

  static showGroups(conn) {
    return new Promise (function(resolve, reject) {
      conn.all(`SELECT * FROM Groups;`, function(err, rows) {
        if(!err) {
          resolve(rows);
        }
        else {
          reject(err);
        }
      })
    })
  }

  static insertGroups(conn, data) {
    conn.run(`INSERT INTO Groups (name_of_group) VALUES ('${data.nama_group}')`)
  }

  static editGroups(conn, param, callback) {
    conn.all(`SELECT * FROM Groups WHERE id = ${param.id}`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static updateGroups(conn, data, param) {
    conn.run(`UPDATE Groups SET name_of_group='${data.nama_group}' WHERE id=${param.id}`)
  }

  static deleteGroups(conn, param) {
    conn.run(`DELETE FROM Groups WHERE id = ${param.id}`)
  }
}

module.exports = Groups
