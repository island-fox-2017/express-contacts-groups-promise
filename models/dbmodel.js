const sqlite3 = require('sqlite3').verbose()


class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }

  createTableContacts() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts
       (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number INTEGER, email text);`)
  }

  createTableGroups() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups
             (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text unique);`)
  }

  createTableAddresses() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Addresses
             (id INTEGER PRIMARY KEY AUTOINCREMENT, street text, city text, zip_code INTEGER, ContactId INTEGER);`)
  }

  createTableProfiles() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles
             (id INTEGER PRIMARY KEY AUTOINCREMENT, username text unique, password text, ContactId INTEGER);`)
  }

  createTableContactsGroups(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts_Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ContactId INTEGER,
        GroupId INTEGER
      );`);
  }

  createTableAll() {
    this.createTableProfiles()
    this.createTableAddresses()
    this.createTableGroups()
    this.createTableContacts()
    this.createTableContactsGroups()
  }

}

module.exports = DbModel
