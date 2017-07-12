const DbModel = require('./DbModel')

class Contact_Group {
  constructor(data){
  }
  
  static findAll(conn, callback){
    conn.all('SELECT * FROM Contacts_Groups', function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static create(conn, data){
    conn.run(`INSERT INTO Contacts_Groups(Contacts_id, Groups_id) VALUES (${data.saveContacts_id}, ${data.saveGroups_id});`)
  }
  
  static findById(conn, id, callback){
    conn.get(`SELECT * FROM Contacts_Groups WHERE id=${id};`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static update(conn, data, id){
    conn.run(`UPDATE Contacts_Groups SET Contacts_id='${data.saveContacts_id}',
    Groups_id='${data.saveGroups_id}' WHERE id='${id}';`)
  }
  
  static destroy(conn, id){
    conn.run(`DELETE FROM Contacts_Groups WHERE id=${id};`)
  }
    
}


module.exports = Contact_Group;
