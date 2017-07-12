class Profiles{
  constructor(){
  }
  
  static selectAll(conn,callback){
    let query = `select * from Profiles`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else callback(true, null);
    })
  }
  
  static selectProfileJoinContact(conn){
    return new Promise(function(resolve, reject){
      let query = `select Profiles.id, Profiles.username, Profiles.password, Profiles.contacts_id, Contacts.name, Contacts.company, contacts.telp_number from
    Profiles join Contacts on Profiles.contacts_id = Contacts.id`;
    conn.all(query, function(err, rows){
    if(!err) resolve(rows);
    else reject(err);
    })
  })
  }
    
    
  //   let query = `select Profiles.id, Profiles.username, Profiles.password, Profiles.contacts_id, Contacts.name, Contacts.company, contacts.telp_number from
  // Profiles join Contacts on Profiles.contacts_id = Contacts.id`;
  //   conn.all(query, function(err, rows){
  //   if(!err) callback(false, rows);
  //   else callback(true, null);
  // })
  // }
  
  static insert(conn, data){
    let query = `insert into 'Profiles' (username, password, contacts_id) values ('${data.username}','${data.password}','${data.contacts_id}')`;
    conn.run(query);
  }
  
  static selectById(conn, id){
    return new Promise(function(resolve, reject){
      let query = `select * from Profiles where id = '${id}' `;
      conn.all(query, function (err, rows){
        if(!err) resolve(rows);
        else reject(err);
      })
    })
  }
  
  
  static update(conn, id, data){
    let query = `update Profiles set username = '${data.username}', password = '${data.password}', contacts_id = '${data.contacts_id}' where id = '${id}'`;
    conn.run(query);
  }
  
  static delete(conn, id){
    let query = `delete from Profiles where id = '${id}'`;
    conn.run(query);
  }
  
}

module.exports = Profiles;
