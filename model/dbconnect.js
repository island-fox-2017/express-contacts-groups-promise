const sqlite3 = require('sqlite3').verbose()

class DbModel {
  constructor(dbfile) {
    this.connection = new sqlite3.Database(dbfile);
  }

  createContactsTable() {
    let contactsTable = `CREATE TABLE IF NOT EXISTS Contacts (contactsid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), company VARCHAR(20), telp_number VARCHAR(12), email VARCHAR(20));`;

    this.connection.run(contactsTable, err => {
      if (!err) console.log('Contacs table created');
      else console.log('Contacts already defined');
    })
  }

  createGroupsTable() {
    let groupsTable = `CREATE TABLE IF NOT EXISTS Groups (groupsid INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(20));`;

    this.connection.run(groupsTable, err => {
      if (!err) console.log('Groups table created');
      else console.log('Groups already defined');
    })
  }

  createProfilesTable() {
    let profilesTable = `CREATE TABLE IF NOT EXISTS Profiles (profilesid INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(10), password VARCHAR(15), profilecontact INTEGER, FOREIGN KEY (profilecontact) REFERENCES Contacs(contactsid));`;

    this.connection.run(profilesTable, err => {
      if (!err) console.log('Profiles table created');
      else console.log('Profiles already defined');
    })
  }

  createAddressTable() {
    let addressesTable = `CREATE TABLE IF NOT EXISTS Addresses (addressesid INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(15), city VARCHAR(15), zip VARCHAR(5), addresscontact INTEGER, FOREIGN KEY (addresscontact) REFERENCES Contacs(contactsid));`;

    this.connection.run(addressesTable, err => {
      if (!err) console.log('Addresses table created');
      else console.log('Addresses already defined');
    })
  }

  createContactsGroupsTable() {
    let contactsGroupsTable = `CREATE TABLE IF NOT EXISTS ContactsGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY (contacts_id) REFERENCES Contacts (contactsid), FOREIGN KEY (groups_id) REFERENCES Groups (groups_id));`;

    this.connection.run(contactsGroupsTable, err => {
      if (!err) console.log(('Contacts - Groups table created'));
      else console.log('Contacts - Groups table already defined');
    })
  }

} // class DbModel

module.exports = DbModel

// let database = new DbModel('../db/data.db');
// database.createContactsTable();
// database.createAddressTable();
// database.createProfilesTable();
// database.createGroupsTable();
// database.createContactsGroupsTable();
