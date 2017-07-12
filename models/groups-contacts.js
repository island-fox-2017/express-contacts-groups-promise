const ModelDb = require('./DbModel');

class GroupsContacts {
  constructor(data) {
    this.id = data.id;
    this.contact_id = data.contact_id;
    this.group_id = data.group_id;
  }

  static showContactsGroups (conn, callback) {
    conn.all(`SELECT * FROM contact_group;`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
   })
  }

 static showGCName (conn) {
   return new Promise (function (resolve, reject){
     conn.all(`SELECT contact_group.id, Contacts.name, Groups.name_of_group FROM contact_group
                LEFT JOIN Contacts on Contacts.id = contact_group.contact_id
                LEFT JOIN Groups on Groups.id = contact_group.group_id;`, function(err, rows) {
                  if(!err) {
                    resolve(rows)
                  }
                  else  {
                    reject(err)
                  }
                })
   })
 }

 static joinContactsGroups (conn, param, callback) {
   conn.all(`SELECT Contacts.name, Groups.name_of_group FROM Contacts
            JOIN contact_group ON Contacts.id = contact_group.contact_id
            JOIN Groups ON contact_group.group_id = Groups.id WHERE Contacts.id=${param.id}`, function(err, rows) {
                  if(!err) {
                    callback(false, rows)
                  }
                  else {
                    callback(true, null)
                  }
                })
  }

  static insertContactsGroups (conn, data) {
    conn.run(`INSERT INTO contact_group (contact_id, group_id)
              VALUES (${data.contact_id}, ${data.group_id})`)
  }

  static deleteContactsGroups (conn, param) {
    conn.run(`DELETE FROM contact_group WHERE id = ${param.id}`)
  }

}//END of Class


module.exports = GroupsContacts;
