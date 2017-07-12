const sqlite3 = require('sqlite3').verbose();


class DBModel {
  constructor(fileName){
    this.conn = new sqlite3.Database(fileName); 
  }
  
  setup(){
    let db = this.conn;
    db.run(`CREATE TABLE Groups if not exists (id integer primary key autoincrement, name_of_group varchar(255))`, err =>{
      if(!err) console.log(`create table Groups success`);
      else console.log(err);
    });
    db.run(`CREATE TABLE Contacts if not exists (id integer primary key autoincrement, name varchar(255), company varchar(255), telp_number varchar(255), email varchar(255))`);
    db.run(`CREATE TABLE Profiles (id integer primary key autoincrement, username text, password text, contacts_id integer)`);
    db.run(`CREATE TABLE Address if not exists (id integer primary key autoincrement, street text, city text, zip_code text, contacts_id integer )`);
    db.run(`CREATE TABLE Contacts_groups (id integer primary key autoincrement, contacts_id integer, group_id integer)`);
  }
}


module.exports = DBModel;
