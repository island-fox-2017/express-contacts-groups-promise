const ModelDb = require('./DbModel');

class Profiles {
  constructor(data) {
    // this.id = data.id;
    // this.username = data.username;
    // this.password = data.password;
    // this.contact_id = data.contact_id;
  }

  static showProfiles(conn) {
    return new Promise (function(resolve, reject) {
      conn.all(`SELECT * FROM Profile;`, function(err, rows) {
        if(!err) {
          resolve(rows)
        }
        else {
          reject (err)
        }
      })
    })
  }

  static showNameContact(conn)  {
    return new Promise (function(resolve, reject) {
      conn.all(`SELECT id, name FROM Contacts;`, function(err, rows) {
        if(!err) {
          resolve(rows)
        }
        else {
          reject (err)
        }
      })
    })
  }


  // static showProfiles(conn, callback) {
  //   conn.all(`SELECT * FROM Profile;`, function(err, rows) {
  //     conn.all(`SELECT id, name FROM Contacts;`, function (err, rows2) {
  //       if(!err) {
  //         callback(false, rows, rows2)
  //       }
  //       else {
  //         callback(true, null, null)
  //       }
  //     })
  //   })
  // }

  static insertProfiles(conn, data) {
    conn.run(`INSERT INTO Profile (username, password, contact_id) VALUES ('${data.nama_user}', '${data.pass}', ${data.kontak_id} )`)
  }

  static showProfilesDetail(conn, param, callback) {
    conn.all(`SELECT * FROM Contacts LEFT JOIN Profile ON Contacts.id = Profile.contact_id WHERE Contacts.id=${param.id};`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }


  static editProfiles(conn, param) {
    return new Promise (function (resolve, reject){
      conn.all(`SELECT * FROM Profile WHERE id = ${param.id};`, function(err, rows) {
        if(!err) {
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  // static editProfiles(conn, param, callback) {
  //   conn.all(`SELECT * FROM Profile WHERE id = ${param.id};`, function(err, rows) {
  //     conn.all(`SELECT id, name FROM Contacts;`, function (err, rows2) {
  //       if(!err) {
  //         callback(false, rows, rows2)
  //       }
  //       else {
  //         callback(true, null, null)
  //       }
  //     })
  //   })
  // }

  static updateProfiles(conn, data, param) {
    conn.run(`UPDATE Profile SET username='${data.nama_user}', password='${data.pass}'  WHERE id=${param.id}`)
  }

  static deleteProfiles(conn, param) {
    conn.run(`DELETE FROM Profile WHERE id = ${param.id}`)
  }
}

module.exports = Profiles
