class MyGroup {
  constructor(){

  }

  static showData(db){
    return new Promise(function (resolve, reject) {
      db.all(`SELECT * from CONTACT2017 AS c LEFT JOIN contact_group AS cg ON c.id = cg.contact_id LEFT JOIN GROUPS AS g ON cg.group_id = g.id`, function (err, data) {
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    })

  }

  static insertData(db, data){
    // return new Promise(function (resolve, reject) {
      db.run(`insert INTO contact_group (contact_id, group_id) VALUES (${data.contact_id}, ${data.group_id})`);
    // })
  }


}

module.exports = MyGroup
