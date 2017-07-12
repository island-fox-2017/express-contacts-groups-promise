class Address {
  constructor(data) {
    this.street = data.street;
    this.city = data.city;
    this.zip_code = data.zip_code;
    this.contact_id = data.contact_id;
  }

  static showAddress(conn, callback) {
    conn.all(`SELECT * FROM address;`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

  static forSelectOptionByContactId(conn, callback) {
    conn.all(`SELECT id, first_name || ' ' || last_name as long_name FROM contacts`, function(error, rows2) {
      if (!error) {
        callback(false, rows2)
      } else {
        callback(true, null)
      }
    })
  }

  static showDataAddressById(conn, param, callback) {
    conn.all(`SELECT * FROM address Where id = ${param};`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static insertDataAddress(conn, data) {
    conn.run(`INSERT INTO address (street, city, zip_code, contact_id)
    VALUES ('${data.street}', '${data.city}', '${data.zip_code}', '${data.selectIdContact}')`);
  }

  static updateDataAddressById(conn, data, param) {
    conn.run(`UPDATE address set street = '${data.street}', city = '${data.city}', zip_code = '${data.zip_code}', contact_id = '${data.contact_id}' WHERE id = ${param}`)
  }

  static deleteDataAddressById(conn, param) {
    conn.run(`DELETE FROM address WHERE id = ${param}`)
  }

}

module.exports = Address
