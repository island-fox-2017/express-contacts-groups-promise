class Contact {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.name = dataObject.name;
    this.company = dataObject.company;
    this.telp_number = dataObject.telp_number;
    this.email = dataObject.email;
  }

// find all
  // static findAllContact(connection, callback) {
  //   connection.all(`SELECT * FROM Contacts; `, function(err, rows) {
  //     if(!err) {
  //       callback(false, rows)
  //     } else {
  //       callback(err, null)
  //     }
  //   })
  // }
//promise findAll
  static findAllContact(connection) {
    return new Promise(function(resolve, reject){
      connection.all(`SELECT * FROM Contacts;`, function(err, rows) {
        if(!err) {
          resolve(rows)
        } else {
          reject(err)
        }
    })
  })
}

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


static showGroupObject(connection) {
    let dataContact = Contact.findAllContact(connection)
    .then((dataContact) => {
      return dataContact;
    })
    let dataContactGroup = Contact.joinTogether(connection)
    .then((dataContactGroup) => {
      return dataContactGroup;
    })
    return Promise.all([dataContact, dataContactGroup]);
}


static showAddressInContact(connection, parameter) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Contacts LEFT JOIN Addresses on Contacts.id = Addresses.ContactId WHERE Contacts.id = '${parameter}'`, function(err, rows) {
      if(!err) {
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}










// insert / add
static insertContact(connection, data) {
  connection.all(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')
  `)
}

// find by id
// static findByIdContact(connection, parameter, callback){
//   connection.all(`SELECT * FROM Contacts WHERE id = '${parameter.id}'`, function(err,rows){
//     if(!err) {
//       callback(false, rows)
//     } else {
//       callback(true,null)
//     }
//   })
// }
// promise findByIdContact
static findByIdContact(connection, parameter){
  return new Promise (function (resolve, reject){
    connection.all(`SELECT * FROM Contacts WHERE id = '${parameter.id}'`, function(err,rows){
    if(!err) {
      resolve(rows)
    } else {
      reject(err)
    }
  })
  })
}










// update
static updateContact(connection, data, parameter) {
  connection.all(`UPDATE Contacts SET
  name = '${data.name}',
  company = '${data.company}',
  telp_number = '${data.telp_number}',
  email = '${data.email}' WHERE id = '${parameter.id}';`)
}
// hasOwnProperty

// delete
static deleteContact(connection, parameter) {
  connection.all(`DELETE FROM Contacts WHERE id ='${parameter.id}'`)
}

// showAddress
static showAddress(connection, parameter, callback){
    connection.all(`SELECT * FROM Addresses JOIN Contacts
      ON Contacts.id = Addresses.ContactId
      WHERE Addresses.ContactId = ${parameter.id}`, function(err,rows){
        if(!err){
          callback(null, rows)
        }else {
          callback(err, null)
        }
      })
  }
}


module.exports = Contact;
