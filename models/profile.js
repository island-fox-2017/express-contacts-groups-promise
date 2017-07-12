class Profile {
  constructor(data) {
    this.id = data.id;
    this.name = data.username;
    this.password = data.password;
    this.contact_id = data.contact_id;
  }
  static showProfile(connection){
    return new Promise(function(resolve,reject){
      connection.all(`SELECT Profile.id, Profile.username , Profile.password, Profile.contact_id, Contact.name
                      FROM  Profile  LEFT JOIN  Contact
                      ON Profile.contact_id = Contact.id`,function(err,profile){
                        if(!err){
                          resolve(profile)
                        }else {
                          resolve(err)
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

  static insertProfile(connection, usernameData, passwordData, contact_id ){
    connection.run(`INSERT INTO Profile (username,password,contact_id)
                    VALUES('${usernameData}','${passwordData}','${contact_id}')`)
  }
  static deleteProfile(connection,id){
    connection.run(`DELETE FROM Profile WHERE id = ${id}`)
  }
  static showEdit(connection,id,callback){
    connection.all(`SELECT * FROM Profile WHERE rowid = ${id}`,function(err,edit){
      connection.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`,
      function (err,kontak){
        if (!err) {
          callback(false,edit,kontak)
        }else {
          callback(true,null,null)
        }
      })
    })
  }
  static editProfile(connection,id, usernameData, passwordData, contact_id ){
    connection.run(`UPDATE Profile SET
      username = '${usernameData}',
      password= '${passwordData}',
      contact_id= '${contact_id}'
      WHERE id = '${id}'`)

  }
}

module.exports = Profile;
