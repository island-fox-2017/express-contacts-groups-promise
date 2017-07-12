//models

class ContactGroup {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.ContactId = dataObject.ContactId;
    this.GroupId = dataObject.GroupId;
  }


// diubah ke promise
// static findAllContactGroup(connection, callback){
//   connection.all(`SELECT * FROM Contacts_Groups`, function(err, rows) {
//     if(!err) {
//       callback(false, rows)
//     } else {
//       callback(true, null)
//     }
//   })
// }
// promise findAllContactGroup
static findAllContactGroup(connection) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Contacts_Groups`, function(err, rows) {
      if(!err) {
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}



static insertContactGroup(connection, data){
  connection.run(`INSERT INTO Contacts_Groups (ContactId, GroupId)
  VALUES (${data.ContactId}, ${data.GroupId})`)
}
// kudu dibikin promise jg..
// static joinTogether(connection, callback){
//   connection.all('SELECT * FROM Groups AS g JOIN Contacts_Groups AS cg ON g.id = cg.GroupId JOIN Contacts AS c ON c.id = cg.ContactId', function(err,rows){
// if(!err){
//   callback(false, rows)
// }  else {
//   callback(true, null)
// }
//   })
// }
// }
// promise join together
static joinTogether(connection) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Groups AS g JOIN Contacts_Groups AS cg ON g.id = cg.GroupId JOIN Contacts AS c ON c.id = cg.ContactId`, function(err,rows){
      if(!err) {
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}
}


module.exports = ContactGroup;
