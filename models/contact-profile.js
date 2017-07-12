class Contactprofile {
  constructor(data) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
    this.username = data.username;
    this.pwd = data.pwd;
    this.contact_id = data.contact_id;
  }

  static showDetailContactProfileByContactId(conn, param, callback) {
    conn.all(`SELECT * FROM contacts LEFT JOIN profile on contacts.id = profile.contact_id WHERE contacts.id = '${param}'`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

}

module.exports = Contactprofile
