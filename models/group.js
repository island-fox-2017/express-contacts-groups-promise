class Group {

  constructor(dataGroup){
    this.id = dataGroup.id;
    this.GroupName = dataGroup.GroupName;
  }

  static findAll(con) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT  * FROM ContactGroup`, function (err,rows) {
      if(!err)
          {
            resolve(rows)
          } else {
            reject(err)
          }
    })
    })
  };

  static AddNew(con, data) {
    con.all(`INSERT INTO ContactGroup(GroupName) VALUES ('${data.groupname}')`);
  }

  static edit(con, ident) {
    return new Promise(function(resolve, reject) {
      con.all(`SELECT * FROM ContactGroup WHERE id = '${ident}'`, function (err,rows) {
        if(!err)
        {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  };

  // static edit(con, ident) {
  //   return new Promise(function(resolve, reject) {
  //     con.all(`SELECT * FROM ContactGroup WHERE id = '${ident}'`, function (err,rows) {
  //       if(!err)
  //       {
  //         resolve(rows)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // };
  
    // static findAll(con) {
    //   return new Promise(function(resolve, reject) {
    //   con.all(`SELECT  * FROM ContactGroup`, function (err,rows) {
    //     if(!err)
    //         {
    //           resolve(rows)
    //         } else {
    //           reject(err)
    //         }
    //   })
    //   })
    // };
  static updateEdit(con, ident, data) {
    con.all(`UPDATE ContactGroup SET GroupName = '${data.groupname}' WHERE id = ${ident}`);
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM ContactGroup WHERE id = '${ident}'`);
  }


}

module.exports = Group;
