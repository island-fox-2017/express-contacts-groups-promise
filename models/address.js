class Address {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.street = dataObject.street;
    this.city = dataObject.city;
    this.zip_code = dataObject.zip_code;
    this.ContactId = dataObject.ContactId;
  }

// find all
  // static findAllAddress(connection, callback) {
  //   connection.all('SELECT * FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId', function(err, rows) {
  //     if(!err) {
  //       callback(false, rows)
  //     } else {
  //       callback(true, null)
  //     }
  //   })
  // }
  // static forDropdown(connection, callback) {
  //   connection.all('SELECT * FROM Contacts', function(err,rows){
  //     if(!err) {
  //       callback(false,rows)
  //     } else {
  //       callback(true, null)
  //     }
  //   })
  // }
// 2 diatas dijadiin promise.... trus router nya jg sama ya...
static findAllAddress(connection) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId`, function(err, rows) {
      if(!err) {
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}

static forDropdown(connection) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Contacts`, function(err, rows) {
      if(!err) {
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}











// create
static insertAddress(connection, data) {
  connection.all(`INSERT INTO Addresses(street, city, zip_code, ContactId)
  VALUES('${data.street}', '${data.city}', '${data.zip_code}', '${data.ContactId}')
  `)
}

// find by id
static findByIdAddress(connection, parameter, callback){
  connection.all(`SELECT * FROM Addresses WHERE id = '${parameter.id}'`, function(err,rows){
    if(!err) {
      callback(false, rows)
    } else {
      callback(true,null)
    }
  })
}

// update
static updateAddress(connection, data, parameter) {
  connection.all(`UPDATE Addresses SET
      street = '${data.street}',
      city = '${data.city}',
      zip_code = '${data.zip_code}',
      WHERE id = '${parameter.id}';`)
}

// delete
static deleteAddress(connection, parameter) {
  connection.all(`DELETE FROM Addresses WHERE id ='${parameter.id}'`)
}

}
module.exports = Address;
