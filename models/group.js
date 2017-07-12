class Group {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.name_of_group = dataObject.name_of_group;
  }
//==========
// find all
  // static findAllGroups(connection, callback) {
  //   connection.all(`SELECT * FROM Groups; `, function(err, rows) {
  //     if(!err) {
  //       callback(null, rows)
  //     } else {
  //       callback(err, null)
  //     }
  //   })
  // }
//promise findAll
static findAllGroups(connection) {
  return new Promise(function(resolve, reject){
    connection.all(`SELECT * FROM Groups`, function(err, rows) {
      if(!err) {
      //  console.log('=====',rows);
        resolve(rows)
      } else {
        reject(err)
      }
  })
})
}
//==========
// insert / add
static insertGroups(connection, data) {
  connection.all(`INSERT INTO Groups(name_of_group)
  VALUES('${data.name_of_group}')
  `)
}
// ga di promise, ga da callback

//==========
// find by id
// static findByIdGroups(connection, parameter, callback){
//   connection.all(`SELECT * FROM Groups WHERE id = '${parameter.id}'`, function(err,rows){
//     if(!err) {
//       callback(false, rows)
//       // bisa rows[0], tapi di panggilData jadi panggilData[0]
//     } else {
//       callback(true,null)
//     }
//   })
// }
// ---- Promise findByIdGroups
static findByIdGroups(connection, parameter){
  return new Promise (function (resolve, reject){
    connection.all(`SELECT * FROM Groups WHERE id = '${parameter.id}'`, function(err,rows){
    if(!err) {
      resolve(rows)
    } else {
      reject(err)
    }
  })
  })
}

//=====
// update
static updateGroups(connection, data, parameter) {
  connection.all(`UPDATE Groups SET
  name_of_group = '${data.name_of_group}' WHERE id = '${parameter.id}';`)
  }
// no callback no promise



// delete
static deleteGroups(connection, parameter) {
  connection.all(`DELETE FROM Groups WHERE id ='${parameter.id}'`)
  }
  // no callback no promise


}
module.exports = Group
