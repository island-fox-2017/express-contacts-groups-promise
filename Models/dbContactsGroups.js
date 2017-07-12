class ContactsGroups{
  constructor(){
    
  }
  
  static selectAll(conn){
    return new Promise(function (resolve, reject){
      let query = `select * from Contacts_groups as cg join Contacts as c on cg.contacts_id = c.id join Groups as g on g.id = cg.group_id`;
      conn.all(query, function(err, rows){
        if (!err) resolve(rows);
        else reject(err);
      })
    })
  }  
  
  static selectById(conn, id){
    return new Promise(function (resolve, reject){
      let query = `select * from Contacts_groups where id = '${id}'`;
      conn.all(query, function (err, rows){
        if (!err) resolve(rows);
        else reject(err);
      })
    })
  }
  //   let query = `select * from Contacts_groups where id = '${id}'`;
  //   conn.all(query, function (err, rows){
  //     if (!err) callback(false, rows);
  //     else callback(true, null);
  //   })
  // }
    
  static insert(conn, data){
    let query = `insert into Contacts_groups (contacts_id, group_id) values ('${data.contacts_id}', '${data.group_id}')`;
    conn.run(query);
    }
    
    static update(conn, id, data){
      let query = `update Contacts_groups set contacts_id = '${data.contacts_id}', group_id = '${data.group_id}' where id = '${id}'`;
      conn.run(query);
    }
    
    static delete(conn, id, callback){
      let query = `delete from Contacts_groups where id = '${id}'`;
      conn.run(query);
    }  
    
    static deleteConjContacts(conn, id){
      let query = `delete from Contacts_groups where contacts_id = '${id}'`;
      conn.run(query)
    }
    
    static deleteConjGroups(conn, id){
      let query = `delete from Contacts_groups where group_id = '${id}'`;
      conn.run(query)
    }
}

module.exports = ContactsGroups;
