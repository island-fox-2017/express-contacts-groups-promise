"use strict"

const sqlite3 = require ('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

class DbModel{

  constructor(filename) {
  this.connection = new sqlite3.Database(filename);
  }

  createTableContact() {
   this.connection.run(`CREATE TABLE IF NOT EXISTS Contact(id INTEGER primary key AUTOINCREMENT , Name TEXT, Company TEXT, Telp INTEGER, Email TEXT);`)
  }

  createTableContactGroup() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS ContactGroup(id INTEGER primary key AUTOINCREMENT, GroupName TEXT, Contact_id INTEGER);`)
  }

  createTableProfile() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profile(id INTEGER primary key AUTOINCREMENT, Username varchar(50), Password varchar(50), Contact_id INTEGER);`)
  }

  createTableAddress() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER primary key AUTOINCREMENT, Street varchar(250), City varchar(250), ZIPcode INTEGER, Contact_id INTEGER);`)
  }

  createTableCG() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS CG(id INTEGER primary key AUTOINCREMENT,  ContactID, GroupID);`)
  }

  createAllTable() {
    this.createTableContact()
    this.createTableContactGroup()
    this.createTableProfile()
    this.createTableAddress()
    this.createTableCG()
  };

}

module.exports = DbModel;
