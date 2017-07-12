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
  
  static destroyContactGroup(){
    conn.run(`DELETE FROM Contacts_Groups WHERE Contacts_id = ${id};`)
  }
  
  static destroyContactProfile(){
    conn.run(`DELETE FROM Profiles WHERE Contact_id=${id};`)
  }
  
  static destroyContactAddress(){
    conn.run(`DELETE FROM Address WHERE ContactId=${id};`)
  }
  
  
}

module.exports = Contact;
