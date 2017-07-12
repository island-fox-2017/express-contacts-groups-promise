class Contacts {
  constructor(dataObj) {
    this.id = dataObj.id;
    this.first_name = dataObj.first_name;
    this.last_name = dataObj.last_name;
    this.company = dataObj.company;
    this.telp_number = dataObj.telp_number;
    this.email = dataObj.email;
  }

  static showContacts(conn, callback) {
    conn.all(`SELECT * FROM contacts;`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

  static showDataContactsById(conn, param, callback) {
    conn.all(`SELECT * FROM contacts Where id = ${param};`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static findDataContactById(conn, param, callback) {
    conn.each(`SELECT * FROM contacts Where id = ${param};`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static forDetailGroup(conn, callback){
    conn.all(`SELECT c.id, c.first_name, c.last_name, c.company, c.telp_number, c.email, g.name_group FROM contacts c
LEFT JOIN contactgroup cg
ON
c.id = cg.contact_id LEFT JOIN groups  g
ON g.id = cg.group_id`, function(err, rows){
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static insertDataContacts(conn, data) {
    conn.run(`INSERT INTO contacts (first_name, last_name, company, telp_number, email)
    VALUES ('${data.first_name}', '${data.last_name}', '${data.company}', '${data.telp_number}', '${data.email}')`);
  }

  static updateDataContactsById(conn, data, param) {
    conn.run(`UPDATE contacts set first_name = '${data.first_name}', last_name = '${data.last_name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' WHERE id = ${param}`)
  }

  static deleteDataContacts(conn, param) {
    conn.run(`DELETE FROM contacts WHERE id = ${param}`)
  }

  static deleteDataProfileByContactId(conn, param) {
    conn.run(`DELETE FROM profile WHERE contact_id = ${param}`)
  }

  static deleteDataAddressByContactId(conn, param) {
    conn.run(`DELETE FROM address WHERE contact_id = ${param}`)
  }

  static deleteDataContactGroupByContactId(conn, param) {
    conn.run(`DELETE FROM contactgroup WHERE contact_id = ${param}`)
  }

}

module.exports = Contacts
