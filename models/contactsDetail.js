const DbModel = require('./DbModel')

class ContactsDetail {
  constructor(data){
  }
  
  static showContactDetail(conn, callback){
    conn.all(`SELECT Contacts.id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email, Groups.name_of_group FROM ((Contacts_Groups INNER JOIN Contacts ON Contacts_Groups.Contacts_id = Contacts.id) INNER JOIN Groups ON Contacts_Groups.Groups_id = Groups.id);`, function(err, rows){
      if(!err){
        callback(false,rows)
      } else {
        callback(true, null)
      }
    })
  }
    
}


module.exports = ContactsDetail;
