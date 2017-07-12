const ModelDb = require('./DbModel');

class Contact {
  constructor(data) {
    // this.id = data.id;
    // this.name = data.name;
    // this.company = data.company;
    // this.telp = data.telp_number;
    // this.email = data.email;
  }

  static showContact(conn) {
    return new Promise (function(resolve, reject) {
      conn.all(`SELECT * FROM Contacts;`, function(err, rows) {
        if(!err) {
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static insertContact(conn, data) {
    conn.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${data.nama}', '${data.company_name}', '${data.telp_num}', '${data.email}' )`)
  }

  static editContact(conn, param, callback) {
    conn.all(`SELECT * FROM Contacts WHERE id = ${param.id}`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static updateContact(conn, data, param) {
    conn.run(`UPDATE Contacts SET name='${data.nama}', company='${data.company_name}', telp_number='${data.telp_num}', email='${data.email}' WHERE id='${param.id}'`)
  }

  static deleteContact(conn, param) {
    conn.run(`DELETE FROM Contacts WHERE id = ${param.id}`)
    conn.run(`DELETE FROM contact_group WHERE contact_id = ${param.id}`)
    conn.run(`DELETE FROM Address WHERE contact_id = ${param.id}`)
  }
}

module.exports = Contact
