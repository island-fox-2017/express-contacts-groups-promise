const sqlite = require('sqlite3').verbose()

class DbModel{
  constructor(filename){
    this.connection = new sqlite.Database(filename)
  }
}

module.exports = DbModel;
