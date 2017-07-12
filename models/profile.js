class Profile{
  constructor(){

  }

  createTable(){

  }

  static insertData(db, data){
    db.run(`INSERT INTO PROFILE (username, pass, firstname, lastname, contact_id) VALUES ('${data.username}', '${data.password}', '${data.firstname}', '${data.lastname}', '${data.contact_id}')`);
  }

  static readData(db, callback){
    db.all(`select * from PROFILE`, function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static readUpdateData(db, data, params, callback){
    db.all(`select * from PROFILE where id=${params.id}`,function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })

  }

  static updateData(db, data, params){
    db.run(`UPDATE PROFILE SET pass='${data.password}', firstname='${data.firstname}', lastname='${data.lastname}' WHERE id='${params.id}'`)

  }

  static deleteData(db, params){
    db.run(`delete from PROFILE  where id=${params.id};`);
  }

  static detailContact(db, params, callback){
    db.all(`SELECT * from PROFILE LEFT JOIN CONTACT2017 ON PROFILE.contact_id = CONTACT2017.id where contact_id=${params.id}`, function (err,data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }
}

module.exports = Profile
