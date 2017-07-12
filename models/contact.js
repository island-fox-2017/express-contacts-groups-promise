const DbModel = require('./DbModel')

class Contact { 
  constructor(data){
  }
  
  static findAll(conn, callback){
    conn.all(`SELECT * FROM Contacts;`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static create(conn, data){
    conn.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES('${data.saveName}',
    '${data.saveCompany}',
    '${data.savePhone}',
    '${data.saveEmail}');`)
  }
  
  static update(conn, data, id){
    conn.run(`UPDATE Contacts SET name='${data.saveName}', company='${data.saveCompany}', telp_number='${data.savePhone}',
    email='${data.saveEmail}' WHERE id='${id}';`);
  }
  
  static findById(conn, id, callback){
    conn.get(`SELECT * FROM Contacts WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static destroy(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id=${id};`);
  }
  
}

module.exports = Contact;
