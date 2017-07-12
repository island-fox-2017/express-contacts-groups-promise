const dbModel = require('./db_model');
const db = new dbModel('./db/contacts.db');

class Profiles {
  constructor(parameter) {
    this.id = parameter.id
    this.username = parameter.username
    this.facebook_username = parameter.facebook_username
    this.google_username = parameter.google_username
    this.contacts_id = parameter.contacts_id
  }
  
  static selectAll(conn, callback) {
    conn.all(`SELECT profiles.id, profiles.username, profiles.facebook_username, 
              profiles.google_username, profiles.contacts_id,
              contacts.name, contacts.company, contacts.telp_number, contacts.email
              FROM profiles JOIN contacts 
              ON profiles.contacts_id = contacts.id`, function(err, rows) {
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
    conn.run(`INSERT INTO profiles (username, facebook_username, google_username, contacts_id) 
      VALUES ('${body.username}', '${body.facebook}', '${body.google}', '${body.contacts_id}')`)
  }
  
  static findById(conn, params, callback) {
    conn.all(`SELECT * FROM profiles WHERE id = '${params.id}'`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
   
  static updateData(conn, body, params) {  
    conn.run(`UPDATE profiles SET username = '${body.username}', facebook_username = '${body.facebook}', 
              google_username = '${body.google}', contacts_id = '${body.contacts_id}' 
              WHERE id = '${params.id}'`)
  }
  
  static deleteData(conn, params) {
    conn.run(`DELETE FROM profiles WHERE id = '${params.id}'`)  
  }
  
}

module.exports = Profiles