'use strict'

class Profiles {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.contact_id = data.contact_id;
  }

  static showProfilePromise1(conn) {
    return new Promise((fulfill, reject) => {
      conn.all(`SELECT * FROM Profiles;`, function(err, rows) {
        if (err) {
          reject();
        } else {
          fulfill(rows);
        }
      });
    })
  }

  static showProfilePromise2(conn) {
    return new Promise((fulfill, reject) => {
      conn.all(`SELECT id, name FROM Contacts;`, function (err, rows) {
        if(err) {
          reject();
        } else {
          fulfill(rows);
        }
      });
    });
  }

  static callProfilePromises(conn) {
    let dataProfile = Profiles.showProfilePromise1(conn)
    .then(data_profile => {
      return data_profile;
    })
    .catch((err) => {
      console.log("Error Profile Promise");
    });

    let dataProfile2 = Profiles.showProfilePromise2(conn)
    .then(data_profile2 => {
      return data_profile2;
    })
    .catch((err) => {
      console.log("Error Profile Promise");
    });

    return Promise.all([dataProfile, dataProfile2]);
  }

  // -----------------------------------------------------------
  // Rare case where there are 5(or more) Promise
  // -----------------------------------------------------------
  /*
  static callProfilePromises(conn) {
    Profiles.showProfilePromise1(conn)
    .then(result => {
      Profiles.showProfilePromise2(conn)
      .then(function(result2) {
        return [result, result2]
      })
    })
    .then(function(result_satu_dua) {
      Profiles.showProfilePromise3(conn)
      .then(function(result3) {
        return result_satu_dua.push(result3);
      })
    })
    .then(function(result_satu_dua_tiga) {
      Profiles.showProfilePromise4(conn)
      .then(result4 => {
        return result_satu_dua_tiga.push(result4);
      })
    })
    .then(function(result_satu_dua_tiga_empat) {
      Profiles.showProfilePromise5(conn)
      .then(result5 => {
        return result_satu_dua_tiga_empat.push(resul5);
      })
    })
  }
    */

  static insertData(conn, obj) {
    conn.run(`
      INSERT INTO Profiles (username, password, contact_id)
      VALUES ('${obj.username}', '${obj.password}', '${obj.contact_id}'
      );
    `);
  }

  static deleteData(conn, id) {
    conn.run(`DELETE FROM Profiles WHERE id = ${id};`);
  }

  static editData(conn, id, callback) {
    conn.all(`SELECT * FROM Profiles WHERE id = ${id};`, function(err, rows) {
      if(!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Profiles
      SET username = '${obj.username}', password = '${obj.password}', contact_id='${obj.contact_id}'
      WHERE id = ${obj.id};
    `);
  }

  static showProfileForContact(conn, id, callback) {
    conn.all(`
      SELECT
        Contacts.*,
        Profiles.username,
        Profiles.password
      FROM
        Contacts
      LEFT JOIN Profiles ON
        Contacts.id = Profiles.contact_id
      WHERE
        Contacts.id = ${id};
      `, function (err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      });
  }
}

module.exports = Profiles
