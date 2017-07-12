'use strict'

class Address {
  constructor(data) {
    this.id = data.id
    this.street = data.street
    this.city = data.city
    this.zip = data.zip
    this.Contacts_id = data.Contacts_id
  }

  static selectAll(connection) {
    let promise = new Promise((resolve, reject) => {
      connection.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.name FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id;`, function(err,data) {
        if (!err) {
          resolve(data)
        }
        else {
          reject(err)
        }
      })
    })
    return promise
  }

  static insertData(connection, request) {
    connection.run(`INSERT INTO Addresses (street, city, zip, Contacts_id) VALUES ('${request.formStreet}', '${request.formCity}', '${request.formZip}', ${request.formIdContact});`)
  }

  static deleteData(connection, request) {
    connection.run(`DELETE FROM Addresses WHERE id = '${request.id}'`)
  }

  static getEditData(connection, request) {
    let promise = new Promise((resolve, reject) => {
      connection.all(`SELECT * FROM Addresses WHERE id = '${request.id}';`, function(err,data) {
        if (!err) {
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
    connection.run(`UPDATE Addresses SET street = '${request1.formStreet}', city = '${request1.formCity}', zip = '${request1.formZip}', Contacts_id = ${request1.formIdContact} WHERE id = ${request2.id};`)
  }

}

module.exports = Address
