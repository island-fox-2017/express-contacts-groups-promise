'use stric'

class Contacts{
  constructor(dataObj){
    this.id = dataObj.id;
    this.name = dataObj.name;
    this.company = dataObj.company;
    this.telp_number = dataObj.telp_number;
    this.email = dataObj.email;
  }

  static findAll(conn){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT * FROM Contacts`, function(error, rows){
        if(!error){
          resolve(rows)
        }else {
          reject(error)
        }
      })
    })
  }

  static insertData(conn, obj){
    conn.run(`INSERT INTO Contacts (name, company, telp_number, email)
      VALUES ('${obj.name}', '${obj.company}', '${obj.telp_number}', '${obj.email}')`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = ${id};`);
  }

  static findById(conn, id){
    return new Promise(function(resolve, reject){
      conn.each(`SELECT * FROM Contacts WHERE id = ${id}`, function(error, row){
        if(!error){
          resolve(row)
        }else {
          reject(error)
        }
      })
    })
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = '${data.name}',
      company = '${data.company}',
      telp_number = '${data.telp_number}',
      email = '${data.email}'
      WHERE id = '${id}';`)
  }

  static joinToAddress(conn, id){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT * FROM Address JOIN Contacts
        ON Contacts.id = Address.contacts_id
        WHERE Address.contacts_id = ${id}`, function(error, rows){
          if(!error){
            resolve(rows)
          }else {
            reject(error)
          }
        })
    })
  }

}//end class


module.exports = Contacts;
