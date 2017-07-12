const DbModel = require('./DbModel')

class Group { 
  constructor(data){
  }
  
  static findAll(conn, callback){
    conn.all(`SELECT * FROM Groups;`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static create(conn, data){
    conn.run(`INSERT INTO Groups(name_of_group) VALUES('${data.saveNameGroup}');`)
  }
  
  static update(conn, data, id){
    conn.run(`UPDATE Groups SET name_of_group='${data.saveNameGroup}' WHERE id='${id}';`);
  }
  
  static findById(conn, id, callback){
    conn.get(`SELECT * FROM Groups WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }
  
  static destroy(conn, id){
    conn.run(`DELETE FROM Groups WHERE id=${id};`);
  }
  
}

module.exports = Group;
