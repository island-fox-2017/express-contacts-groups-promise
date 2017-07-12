const dbModel = require('./dbModel');

class Group {

  constructor(data){
    this.id = data.id;
    this.name = data.group_name;
  }

  createTable(){

  }

  static insertData(db, data){
    db.run(`INSERT INTO GROUPS (group_name) VALUES ('${data.group_name}')`);
  }

  static readData(db, callback){
    db.all("select * FROM GROUPS",function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    });
  }

  static readUpdateData(db, params, callback){
    db.all(`select * FROM GROUPS where id=${params.id}`,function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static updateData(db, data, params){
    db.run(`UPDATE GROUPS SET group_name='${data.group_name}'
    WHERE id='${params.id}'`)

  }

  static deleteData(db, params){
    db.run(`delete from GROUPS where id=${params.id};`);
    db.run(`delete from contact_group where group_id=${params.id};`);
  }
}

module.exports = Group
