class Groups {
  constructor(parameter) {
    this.id = parameter.id
    this.name_of_group = parameter.name_of_group
  }
  
  static selectAll(conn, callback) {
    conn.all(`SELECT * FROM groups`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static insertData(conn, body) {
    conn.run(`INSERT INTO groups (name_of_group) VALUES ('${body.nama}')`)  
  }
  
  static findById(conn, params, callback) {
    conn.all(`SELECT * FROM groups WHERE id = '${params.id}'`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static updateData(conn, body, params) {
    conn.run(`UPDATE groups SET name_of_group = '${body.nama}' WHERE id = '${params.id}'`)
  }
  
  static deleteData(conn, params) {
    conn.run(`DELETE FROM groups WHERE id = '${params.id}'`)
  }
  
}

module.exports = Groups