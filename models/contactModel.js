'use strict'

class Contact {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.company = data.company
    this.phone = data.phone_num
    this.email = data.email
  }

  static selectAll(connection) {
    let promise = new Promise((resolve, reject) => {
      connection.all(`SELECT * FROM Contacts;`, (err,dataKontak) => {
        if(!err) {
          resolve(dataKontak)
        }
        else {
          reject(err)
        }
      })
    })
    return promise
  }

  static insertData(connection, request) {
    connection.run(`INSERT INTO Contacts (name,company,phone_num,email) VALUES ('${request.formName}', '${request.formCompany}', '${request.formPhone}', '${request.formEmail}');`)
  }

  static deleteData(connection, request) {
    connection.run(`DELETE FROM Contacts WHERE id=${request.id}`)
  }

  static getEditData(connection, request) {
    let promise = new Promise((resolve,reject) => {
      connection.all(`SELECT * FROM Contacts WHERE id = '${request.id}';`, (err,data) => {
        if(!err) {
          resolve(data)
        }
        else {
          reject(err)
        }
      })
    })
    return promise
  }

  static updateData(connection, request1, request2) {
    connection.run(`UPDATE Contacts SET name='${request1.formName}', company='${request1.formCompany}', phone_num='${request1.formPhone}', email='${request1.formEmail}' WHERE id = ${request2.id}`)
  }

  static showAddress(connection, request) {
    let promise = new Promise((resolve, reject) => {
      connection.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.id FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id WHERE Contacts.id = ${request.id};`, function(err, dataAddress) {
        if(!err) {
          resolve(dataAddress)
        }
        else {
          reject(err)
        }
      })
    })
    return promise
  }

  static showGroup(connection, request) {
    let promise = new Promise((resolve, reject) => {
      connection.all(`select * from Contacts as c left join Contacts_Groups as cg on c.id = cg.Contacts_id left join Groups as g on cg.Groups_id = g.id where c.id = ${request.id};`, function(err,dataGroup) {
        if (!err) {
          resolve(dataGroup)
        }
        else {
          reject(err)
        }
      })
    })
    return promise
  }

}

module.exports = Contact
