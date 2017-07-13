
class ContactGroup {
  constructor() {

  }
  static joinCG(connection){
    return new Promise(function(resolve , reject){
      connection.all(`SELECT ContactGroup.id, Contact.name , Groups.name_of_group
                      ,ContactGroup.group_id, ContactGroup.contact_id
                      ,Contact.id AS cid , Groups.id as gid  FROM ContactGroup
                      LEFT JOIN Contact on cid= ContactGroup.contact_id
                      LEFT JOIN Groups on gid = ContactGroup.group_id `,function(err,rows){
                        if(!err){
                          resolve(rows)
                        }else {
                          reject(err)
                        }
                      })
    })
  }

  static showContact(connection){
    return new Promise(function(resolve,reject){
      connection.all(`SELECT * FROM Contact `,function(err,rows) {
        if (!err) {
          resolve(rows)
        }else {
          resolve(err)
        }
      })
    })
  }

  static showGroups(connection){
    return new Promise(function(resolve,reject){
      connection.all(`SELECT * FROM Groups `,function(err,rows) {
        if (!err) {
          resolve(rows)
        }else {
          resolve(err)
        }
      })
    })
  }

  static insert(connection,data){
    connection.run(`INSERT INTO ContactGroup (contact_id,group_id)
                    VALUES('${data.contactList}','${data.groupList}')`)
  }
  static delete(connection,id){
    connection.run(`DELETE FROM ContactGroup WHERE id = ${id}`)
  }

  static showEdit(connection,id,callback){
    connection.all(`SELECT * FROM Addresses WHERE rowid = ${id}`,function(err,edit){
      connection.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`,
      function (err,kontak){
        if (!err) {
          callback(false,edit,kontak)
        }else {
          callback(true,null,null)
        }
      })
    })
  }
  static editInput(connection, id ,city, zipCode , contact_id){
    connection.run(`UPDATE Addresses SET
      city = '${city}',
      zipCode = '${zipCode}',
      contact_id = '${contact_id}'
      WHERE id = '${id}'`)
  }
}
module.exports = ContactGroup;
