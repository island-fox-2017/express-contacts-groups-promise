'use strict'

class Contacts {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
    this.group_joined = data.group_joined
  }

  static showAll(conn, callback) {
    conn.all(`SELECT * FROM Contacts`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null);
      }
    });
  }

  static showData(conn, callback) {
    conn.all(`
      SELECT
        *
      FROM
        Groups AS g
      JOIN Contacts_Groups AS cg
        ON g.id = cg.group_id
      JOIN Contacts AS c
        ON c.id = cg.contact_id
      ;
      `, function(err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      })
  }

  static showContactPromise(conn) {
    return new Promise(function(fulfill, reject) {
      conn.all(`SELECT * FROM Contacts`, function(err, rows) {
        if(err) {
          reject();
        } else {
          fulfill(rows);
        }
      });
    })
  }

  static showContactPromise2(conn) {
    return new Promise(function(fulfill, reject) {
      conn.all(`SELECT
                   *
                 FROM
                   Groups AS g
                 JOIN Contacts_Groups AS cg
                   ON g.id = cg.group_id
                 JOIN Contacts AS c
                   ON c.id = cg.contact_id;`, function(err, rows) {
         if(err) {
           reject();
         } else {
           fulfill(rows);
         }
      });
    });
  }

  static callContactPromise(conn) {
    let data_contact = Contacts.showContactPromise(conn)
    .then((data_contact) => {
      return data_contact;
    })
    .catch((err) => {
      res.send('hiks error promise contacts');
    });

    let data_contact_join = Contacts.showContactPromise2(conn)
    .then((data_contact_join) => {
      return data_contact_join;
    })
    .catch((err) => {
      res.send('hiks error promise contacts');
    });

    return Promise.all([data_contact, data_contact_join]);
  }

  // static callContactPromise(conn) {
  //   return Contacts.showContactPromise(conn)
  //   .then((data_contact) => {
  //     return [
  //       data_contact,
  //       Contacts.showContactPromise2(conn).then((data_contact_join) => {
  //         return data_contact_join;
  //       })
  //     ];
  //   })
  //   .catch((err) => {
  //     res.send('hiks');
  //   });
  // }

  static insertData(conn, objSomething) {
    conn.run(`
      INSERT INTO Contacts (name, company, telp_number, email)
      VALUES ('${objSomething.name}', '${objSomething.company}', '${objSomething.telp_number}', '${objSomething.email}');
    `);
  }

  static deleteData(conn, id) {
    conn.run(`
      DELETE FROM Contacts WHERE id = ${id};
    `);
  }

  static editData(conn, id, callback) {
    conn.all(`
      SELECT * FROM Contacts WHERE id = ${id};
      `, function (err, rows) {
        if (!err) {
          callback(false, rows);
        } else {
          callback(true, null);
        }
      });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Contacts
      SET name = '${obj.name}', company = '${obj.company}', telp_number = '${obj.telp_number}', email = '${obj.email}'
      WHERE id = ${obj.id};
    `);
  }
}

module.exports = Contacts
