class Address {
  constructor(data) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zipCode = data.zipCode;
    this.contact_id = data.contact_id
  }
  static joinAddress (connection){
  return new Promise(function(resolve,reject){
      connection.all(`SELECT Addresses.id, Addresses.street, Addresses.city
                      ,Addresses.zipCode , Addresses.contact_id , Contact.name
                      FROM Addresses
                      LEFT JOIN Contact ON Addresses.contact_id = Contact.id;`,
              function(err,address){
                if (!err) {
                  resolve(address)
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
  static insertAdress(connection,streetData, cityData , zipcodeData,contact_id){
    connection.run(`INSERT INTO Addresses (street,city,zipCode,contact_id)
                    VALUES('${streetData}','${cityData}','${zipcodeData}','${contact_id}')`)
  }
  static deleteAdress(connection,id){
    connection.run(`DELETE FROM Addresses WHERE id = ${id}`)
  }

  static showEdit(connection,id){
    return new Promise(function (resolve,reject) {
      connection.all(`SELECT * FROM Addresses WHERE rowid = ${id}`,
        function (err,address){
          if(!err){
            resolve(address)
          }else {
            reject(err)
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
module.exports = Address;
