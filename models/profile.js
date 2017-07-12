class Profile {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.username = dataObject.username;
    this.password = dataObject.password;
    this.ContactId = dataObject.ContactId;
  }

// find all
  static findAllProfiles(connection, callback) {
    connection.all(`SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

// insert / add
static insertProfiles(connection, data) {
  connection.all(`INSERT INTO Profiles(username, password, ContactId)
  VALUES('${data.username}', '${data.password}', '${data.ContactId}')
  `)
}

// find by id
static findByIdProfiles(connection, parameter, callback){
  //console.log(parameter);
  connection.all(`SELECT * FROM Profiles WHERE id = '${parameter}';`, function(err,rows){
    if(!err) {
      callback(false, rows)
    } else {
      callback(true,null)
    }
  })
}

// update
static updateProfiles(connection, data, parameter) {
  connection.all(`UPDATE Profiles SET
  username = '${data.username}',
  password = '${data.password}' WHERE id = '${parameter}';`)
  }

// delete
static deleteProfiles(connection, parameter) {
  connection.all(`DELETE FROM Profiles WHERE id ='${parameter}'`)
  }
}



module.exports = Profile
