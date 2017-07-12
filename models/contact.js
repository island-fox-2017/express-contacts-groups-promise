const dbModel = require('./dbModel');

class Contact {
  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.phone;
    this.email = data.email;
  }

  createTable(){

  }

  static insertData(conn, data){
    conn.run(`INSERT INTO CONTACT2017
      (name, company, phone, email)
      VALUES ('${data.fullname}', '${data.company}',
      '${data.phone}', '${data.email}')`);
  }

  static readData(conn, callback){
    return new Promise(function (resolve, reject) {
      conn.all(`select * FROM CONTACT2017`, function (err, rows) {
        if(!err){
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  }

  // static readDataById(conn, callback){
  //   conn.all()
  // }

  static readUpdateData(conn, params, callback){
    conn.all(`select * FROM CONTACT2017 where id=${params.id}`,function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static updateData(conn, data, params){
    conn.run(`UPDATE CONTACT2017 SET
      name='${data.name}', company='${data.company}',
      phone='${data.phone}', email='${data.email}'
      WHERE id='${params.id}'`);
  }

  static deleteData(conn, params){
    conn.run(`delete from CONTACT2017 where id=${params.id};`);
    conn.run(`delete from contact_group where contact_id=${params.id};`);
    conn.run(`delete from ADDRESS where contact_id=${params.id};`);
  }

  static showAddressDetail(db, params, callback){
    db.all(`SELECT * from ADDRESS INNER JOIN CONTACT2017 ON ADDRESS.contact_id = CONTACT2017.id INNER JOIN PROFILE ON PROFILE.contact_id = CONTACT2017.id where PROFILE.contact_id=${params.id}`, function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

}

module.exports = Contact
