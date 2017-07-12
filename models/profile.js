const DbModel = require('./DbModel')

class Profile { 
  constructor(data){
  }
  
  static findAll(conn, callback){
    conn.all(`SELECT * FROM Profiles;`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static belongsToContact(conn, callback){
  conn.all(`SELECT Profiles.id, Profiles.username, Profiles.password, Profiles.Contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles JOIN Contacts ON Profiles.Contact_id = Contacts.id;`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static create(conn, data){
    conn.run(`INSERT INTO Profiles(username, password, Contact_id) VALUES('${data.saveUsername}', '${data.savePassword}', '${data.saveContactID}');`);
  }
  
  static update(conn, data, id){
    conn.run(`UPDATE Profiles SET username='${data.saveUsername}',
    password='${data.savePassword}',
    Contact_id='${data.saveContactID}' WHERE id='${id}';`);
  }
  
  static findById(conn, id, callback){
    conn.get(`SELECT * FROM Profiles WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static destroy(conn, id){
    conn.run(`DELETE FROM Profiles WHERE id=${id};`);
  }
  
}

module.exports = Profile;
