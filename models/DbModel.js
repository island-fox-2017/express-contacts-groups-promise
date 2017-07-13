"use strict"

const sqlite = require('sqlite3').verbose();

class DbModel {
  constructor(filedb) {
    this.connection = new sqlite.Database(filedb);
  };
  createTableContacts() {
    let tableContacts = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(140), company VARCHAR(255), telp_number VARCHAR(20), email VARCHAR(140));`;

    this.connection.run(tableContacts);
  };
  createTableGroups() {
    let tableGroups = `CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(140));`;

    this.connection.run(tableGroups);
  };
  createTableProfiles() {
    let tableProfiles = `CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER);`;

    this.connection.run(tableProfiles);
  };
  createTableAddresses() {
    let tableAddresses = `CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER, contact_id INTEGER);`;

    this.connection.run(tableAddresses);
  };
};//class

// let model = new CreateTable();
// model.createTableContacts();

module.exports = DbModel;
