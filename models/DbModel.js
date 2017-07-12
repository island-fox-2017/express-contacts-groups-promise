const sqlite3 = require('sqlite3').verbose()

class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }

  // createTableTest() {
  //   this.connection.run(`CREATE TABLE IF NOT EXISTS TEST (id INT, name text)`)
  // }
}

// console.log(DbModel.connection);

module.exports = DbModel
