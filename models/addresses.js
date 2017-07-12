const dbModel = require('./db_model');
const db = new dbModel('./db/contacts.db');

class Addresses {
  constructor(parameter) {
    this.id = parameter.id
    this.street = parameter.street
    this.city = parameter.city
    this.zipcode = parameter.zipcode
    this.contacts_id = parameter.contacts_id
  }
  
  static selectAll(conn, callback) {
    conn.all(`SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode, 
      addresses.contacts_id, contacts.name FROM addresses JOIN contacts ON 
      addresses.contacts_id = contacts.id`, function(err, rows) {
        if (!err) {
          callback(false, rows)
        } else {
          callback(true, null)
        }
    })
  }
  
  static dropDownContact(conn, callback) {
    conn.all(`SELECT * FROM contacts`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static insertData(conn, body) {
    conn.run(`INSERT INTO addresses (street, city, zipcode, contacts_id) 
              VALUES ('${body.street}', '${body.city}', '${body.zipcode}', '${body.contacts_id}' )`)
  }
  
  static findById(conn, params, callback) {
    conn.all(`SELECT * FROM addresses WHERE id = '${params.id}'`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }      
    })
  }
  
  static updateData(conn, body, params) {
    conn.run(`UPDATE addresses SET street = '${body.street}', city = '${body.city}', 
              zipcode = '${body.zipcode}', contacts_id = '${body.contacts_id}' 
              WHERE id = '${params.id}'`)   
  }
  
  static deleteData(conn, params) {
    conn.run(`DELETE FROM addresses WHERE id = '${params.id}'`)
  }
  
  static findAddressByContact(conn, params, callback) {
    conn.all(`SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode, 
              addresses.contacts_id, contacts.name, contacts.company, contacts.telp_number, 
              contacts.email FROM addresses JOIN contacts ON addresses.contacts_id = contacts.id 
              WHERE addresses.contacts_id = '${params.id}'`, function(err, rows) {
        if (!err) {
          callback(false, rows)
        } else {
          callback(true, null)
        }
    })
  } 
  
}

module.exports = Addresses