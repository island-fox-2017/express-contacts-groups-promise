const DbModel = require('./DbModel')

class Address { 
  constructor(data){
  }
  
  static findAll(conn, callback){
    conn.all(`SELECT * FROM Address;`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static belongsToContact(conn, callback){
  conn.all(`SELECT Address.id, Address.street, Address.city, Address.zip_code, Address.ContactId, Contacts.name, Contacts.company FROM Address JOIN Contacts ON Address.ContactId = Contacts.id;`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static create(conn, data){
    conn.run(`INSERT INTO Address(street, city, zip_code, ContactId) VALUES('${data.saveStreet}', '${data.saveCity}', '${data.saveZIP}', '${data.saveContactsID}');`);
  }
  
  static update(conn, data, id){
    conn.run(`UPDATE Address SET
      street='${data.saveStreet}',
      city='${data.saveCity}',
      zip_code='${data.saveZIP}',
      ContactId='${data.saveContactsID}' WHERE id='${id}';`);
  }
  
  static findById(conn, id, callback){
    conn.get(`SELECT * FROM Address WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static destroy(conn, id){
    conn.run(`DELETE FROM Address WHERE id=${id};`);
  }
  
}

module.exports = Address;
