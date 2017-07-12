class Contacts {
  constructor(parameter) {
    this.id = parameter.id
    this.name = parameter.name
    this.company = parameter.company
    this.number = parameter.telp_number
    this.email = parameter.email
  }
  
  static selectAll(conn, callback) {
    conn.all(`SELECT * FROM contacts`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  // static contactBelongsToGroups(conn, callback) {
  //   conn.all(`SELECT * FROM contacts AS c LEFT JOIN contacts_groups AS cg 
  //             ON c.id = cg.contacts_id LEFT JOIN groups AS g 
  //             ON g.id = cg.groups_id`, function(err, rows) {
  //       if (!err) {
  //         callback(false, rows)
  //       } else {
  //         console.log(err);
  //         callback(true, null)
  //       }
  //     })    
  // }  
  
  static insertData(conn, body) {
    conn.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${body.nama}', '${body.company}', '${body.phone}', '${body.email}')`)
  }
  
  static findById(conn, params, callback) {
    conn.all(`SELECT * FROM contacts WHERE id = ${params.id}`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })    
  }
  
  static updateData(conn, body, params) {
    conn.run(`UPDATE contacts SET name = '${body.nama}', company = '${body.company}', telp_number = '${body.phone}', email = '${body.email}' WHERE id = '${params.id}'`)
  }
  
  static deleteData(conn, params) {
    conn.run(`DELETE FROM contacts WHERE id = '${params.id}'`)
  }
    
}

module.exports = Contacts