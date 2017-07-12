const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }

  createTableContacts() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, company TEXT, telp_number TEXT, email TEXT)`);
    console.log('Table contacts created');
  }

  createTableGroups() {
    this.connection.run(`CREATE TABLE if not exists groups (id INTEGER primary key AUTOINCREMENT, name_group TEXT)`);
    console.log('Table groups created');
  }

  createTableProfile() {
    this.connection.run(`CREATE TABLE if not exists profile (id INTEGER primary key AUTOINCREMENT, username TEXT, pwd TEXT, contact_id INTEGER)`);
    console.log('Table profile created');
  }

  createTableAddress() {
    this.connection.run(`CREATE TABLE if not exists address (id INTEGER primary key AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER(9), contact_id INTEGER)`);
    console.log('Table address created');
  }

  createTableContactGroup() {
    this.connection.run(`CREATE TABLE if not exists contactgroup (id INTEGER primary key AUTOINCREMENT, contact_id INTEGER, group_id INTEGER)`);
    console.log('Table contactgroup created');
  }



  createTables() {
    this.createTableContacts();
    this.createTableGroups();
    this.createTableProfile();
    this.createTableAddress();
    this.createTableContactGroup();
  }
}


module.exports = DbModel
// let dbModel = new DbModel ('./db/data.db');
// console.log(dbModel.createTableTest());
