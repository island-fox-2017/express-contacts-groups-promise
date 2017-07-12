const sqlite = require('sqlite3').verbose();

class DbModel {
  constructor(file) {
    this.connection = new sqlite.Database(file);
  }
  
  // METHOD FOR CREATE TABLES
  setup() {
    let db = this.connection
    db.serialize(function () {
      let createTableContacts = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);`;
      let createTableGroups = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`;
      let createTableProfiles = `CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, facebook_username TEXT, google_username TEXT, contacts_id INTEGER);`;
      let createTableAddresses = `CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT, contacts_id TEXT);`;
      let createTableContactsGroups = `CREATE TABLE IF NOT EXISTS contacts_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER);`;
      db.run(createTableContacts, (err) => err ? console.log(err) : console.log('succesfully create table contacts'));
      db.run(createTableGroups, (err) => err ? console.log(err) : console.log('succesfully create table groups'));
      db.run(createTableAddresses, (err) => err ? console.log(err) : console.log('succesfully create table addresses'));
      db.run(createTableProfiles, (err) => err ? console.log(err) : console.log('succesfully create table profiles'));
      db.run(createTableContactsGroups, (err) => err ? console.log(err) : console.log('succesfully create table contacts_groups'));                                  
    })
    db.close();  
  }
}

module.exports = DbModel
// let test = new DbModel('../db/contacts.db')
// console.log(test);
// test.setup()

