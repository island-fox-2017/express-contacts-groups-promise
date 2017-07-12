class Groups {
  constructor(data) {
    this.name_group = data.name_group;
  }

  static showGroups(conn, callback) {
    conn.all(`SELECT * FROM groups;`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

  static showDataGroupsById(conn, param, callback) {
    conn.all(`SELECT * FROM groups Where id = ${param};`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static insertDataGRoups(conn, data) {
    conn.run(`INSERT INTO groups (name_group) VALUES ('${data.name_group}')`);
  }

  static updateDataGroupsById(conn, data, param) {
    conn.run(`UPDATE groups set name_group = '${data.name_group}' WHERE id = ${param}`)
  }

  static deleteDataGroupsById(conn, param) {
    conn.run(`DELETE FROM groups WHERE id = ${param}`)
  }

}

module.exports = Groups
