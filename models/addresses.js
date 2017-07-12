const ModelDb = require('./DbModel');

class Addresses {
  constructor(data) {
    // this.id = data.id;
    // this.street = data.street;
    // this.city = data.city;
    // this.zip_code = data.zip_code;
    // this.contact_id = data.contact_id;
  }

  static showAddr(conn)  {
    return new Promise (function (resolve, reject) {
      conn.all(`SELECT * FROM Address;`, function(err, rows) {
        if(!err) {
          resolve(rows)
        }
        else {
          reject (err)
        }
      })
    })
  }

  static showNameContact (conn)  {
    return new Promise (function (resolve, reject) {
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

  // static showAddr(conn, callback) {
  //   conn.all(`SELECT * FROM Address;`, function(err, rows) {
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

  static insertAddr(conn, data) {
    conn.run(`INSERT INTO Address (street, city, zip, contact_id)
    VALUES ('${data.street}', '${data.city}', ${data.zip}, '${data.kontak_id}' )`)
  }


  static showAddrDetail(conn, param, callback) {
    conn.all(`SELECT * FROM Contacts LEFT JOIN Address ON Contacts.id = Address.contact_id WHERE Contacts.id=${param.id};`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }


  static editAddr(conn, param) {
    return new Promise (function (resolve, reject) {
      conn.all(`SELECT * FROM Address WHERE id = ${param.id};`, function(err, rows) {
        if (!err) {
          resolve(rows)
        }
        else {
          reject(err)
        }
       })
    })
  }


  // static editAddr(conn, param, callback) {
  //   conn.all(`SELECT * FROM Address WHERE id = ${param.id};`, function(err, rows) {
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

  static updateAddr(conn, data, param) {
    conn.run(`UPDATE Address SET street='${data.street}', city='${data.city}', zip=${data.zip}  WHERE id=${param.id}`)
  }

  static deleteAddr(conn, param) {
    conn.run(`DELETE FROM Address WHERE id = ${param.id}`)
  }
}

module.exports = Addresses
