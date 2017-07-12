'use strict'

class GroupsContacts{
  constructor(data){
    this.id = data.id;
    this.groups_id = data.groups_id;
    this.contacts_id = data.contacts_id;
  }

  static findAll(conn){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT * FROm GroupsContacts`, function(err, rows){
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static joinAll(conn){
    return new Promise(function(resolve, reject){
      conn.all(`SELECT *
        FROM Groups  g
        INNER JOIN GroupsContacts  gc
          ON g.id = gc.groups_id
          INNER JOIN Contacts  c
          ON c.id = gc.contacts_id`, function(err, rows){
            if(!err){
              resolve(rows)
            }else {
              reject(err)
            }
          })
    })
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO GroupsContacts (groups_id, contacts_id)
    VALUES (${data.groups_id}, ${data.contacts_id})`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM GroupsContacts WHERE id = ${id}`);
  }



}//END CLASS

module.exports = GroupsContacts;
