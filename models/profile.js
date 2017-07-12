class Profile {
  constructor(data) {
    this.username = data.username;
    this.pwd = data.pwd;
    this.contact_id = data.contact_id;
  }

  static showProfile(conn, callback) {
    conn.all(`SELECT * FROM profile;`, function(error, rows) {
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

  static showDataProfileById(conn, param, callback) {
    conn.all(`SELECT * FROM profile Where id = ${param};`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static insertDataProfile(conn, data) {
    conn.run(`INSERT INTO profile (username, pwd, contact_id)
    VALUES ('${data.username}', '${data.pwd}', '${data.selectIdContact}')`);
  }

  static updateDataProfileById(conn, data, param) {
    conn.run(`UPDATE profile set username = '${data.username}', pwd = '${data.pwd}', contact_id = '${data.contact_id}' WHERE id = ${param}`)
  }

  static deleteDataProfile(conn, param) {
    conn.run(`DELETE FROM profile WHERE id = ${param}`)
  }

}

module.exports = Profile
