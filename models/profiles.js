'use strict'

class Profiles{
  constructor(data){
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zip_code = data.zip_code;
    this.contacts_id = data.contacts_id;
  }

  static findAll(conn){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT * FROM Profiles`, function(err, rows){
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static findById(conn, id){
    return new Promise(function(resolve, reject){
      conn.each(`SELECT * FROM Profiles WHERE id = ${id}`, function(err, rows){
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static insertData(conn, obj){
    conn.run(`INSERT INTO Profiles (username, password, contacts_id)
      VALUES ('${obj.username}', '${obj.password}', ${obj.contacts_id})`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM Profiles WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Profiles SET
      username = '${data.username}',
      password = '${data.password}',
      contacts_id = ${data.contacts_id}
      WHERE id = ${id};`);
  }

  static joinToContact(conn,id){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT * FROM Profiles JOIN Contacts
        ON Profiles.contacts_id = Contacts.id
        WHERE Profiles.contacts_id = ${id}`, function(err, rows){
          if(!err){
            resolve(rows)
          }else {
            reject(err)
          }
        })
    })
  }
}//END class


module.exports = Profiles;
