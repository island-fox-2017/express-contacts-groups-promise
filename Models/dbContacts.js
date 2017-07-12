class Contacts {
  constructor(){
  }
  
  static selectAll(conn){
    return new Promise(function(resolve, reject){
      let query = `select * from Contacts`;
      conn.all(query, function (err, data_contacts){
        if(!err) resolve(data_contacts);
        else reject(err);
      })
    })
  }
  
  static selectConjGroups(conn,id,callback){
    let query = `select * from Contacts as c join Contacts_groups as cg on c.id = cg.contacts_id join Groups as g on g.id = cg.group_id where c.id='${id}'`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else console.log(err);
    })
  }
  
  static selectById(conn, id, callback){
    let query = `select * from Contacts where id = '${id}' `;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else callback(true, null);
    })
  }
  
  static insert(conn, data){
    let query = `insert into Contacts (name, company, telp_number, email) values ('${data.name}','${data.company}','${data.telp_number}','${data.email}')`;
    conn.run(query)
  }
  
  static update(conn, id, data){
    let query = `update Contacts set name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' where id = '${id}'`;
    conn.run(query);
  }
  
  static delete(conn, id, callback){
    let query = `delete from 'Contacts' where id='${id}'`;
    conn.run(query)
  }
  
  static selectContactAddress(conn, id, callback){
    let query = `select address.id, address.street, address.city, address.zip_code from Address join Contacts on contacts_id = Contacts.id where contacts_id = '${id}'`;
    conn.all(query, function(err, rows){
      if (!err) callback(false, rows);
      else callback(true, null);
    })
  }
}


module.exports = Contacts;
