var sqlite3 = require('sqlite3').verbose();

class ConnectDB {
  constructor() {
    this.dataBase = new sqlite3.Database('./db/data.db');
  }
  createTableContact() {
    this.dataBase.run(`CREATE TABLE IF NOT EXISTS Contact
             (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) , company VARCHAR(255), telp_number VARCHAR(255)  , email VARCHAR(255)) ;`);
    console.log("Table Contact created");
  }
  createTableGroup(){
    this.dataBase.run(`CREATE TABLE IF NOT EXISTS Groups
             (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255));`);
    console.log('Table Group Created');

  }
  createTableProfile() {
    this.dataBase.run(`CREATE TABLE IF NOT EXISTS Profile
            (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255),
            password VARCHAR(255),contact_id VARCHAR(255))`)
    console.log('Table Profile Created');
  }
  createTableAddress() {
    this.dataBase.run(`CREATE TABLE IF NOT EXISTS Addresses
            (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(255),
            city VARCHAR(255), zipCode VARCHAR(255),contact_id VARCHAR(255)) ;`)
    console.log('Table Address Created');
  }
  createTableContactGroup() {
    this.dataBase.run(`CREATE TABLE IF NOT EXISTS ContactGroup
            (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id VARCHAR(255),group_id
            VARCHAR(255));`)
    console.log('Table ContactGroup Created');
  }
}
let koneksi = new ConnectDB()
// console.log(koneksi);
module.exports = ConnectDB;
