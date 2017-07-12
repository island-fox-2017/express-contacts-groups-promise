'use strict'

var sqlite3 = require('sqlite3').verbose()

class Database {
  constructor(fileDb) {
    this.connection = new sqlite3.Database(fileDb)
  }

  createTable() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) , company VARCHAR(255), phone_num VARCHAR(255)  , email VARCHAR(255));`)
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255));`)
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR, Contacts_id INTEGER);`)
    this.connection.run(`CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city VARCHAR, zip VARCHAR, Contacts_id INTEGER);`)
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, Contacts_id INTEGER, Groups_id INTEGER);`)
  }
}

module.exports = Database
