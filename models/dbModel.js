const sqlite3 = require('sqlite3').verbose();

class dbModel{
  constructor(fileDB){
    this.connection = new sqlite3.Database(fileDB);
  }
}



module.exports = dbModel;
