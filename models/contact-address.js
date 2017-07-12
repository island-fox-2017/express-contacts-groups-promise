class Contactaddress {
  constructor(data) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
    this.street = data.street;
    this.city = data.city;
    this.zip_code = data.zip_code;
    this.contact_id = data.contact_id;
  }

  static showDetailContactAddressByContactId(conn, param, callback) {
    conn.all(`SELECT * FROM contacts LEFT JOIN address on contacts.id = address.contact_id WHERE contacts.id = '${param}'`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

}

module.exports = Contactaddress
