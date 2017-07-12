class Address{
  constructor(){}
  
  static selectAll(conn,callback){
    let query = `select * from Address`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else console.log(err);;
    })
  }
  
  static selectById(conn, id){
    return new Promise(function(resolve, reject){
      let query = `select * from Address where id = '${id}' `;
      conn.all(query, function (err, rows){
        if(!err) resolve(rows);
        else reject(err);
      })
    })
  }
  
  static insert(conn, data){
    let query = `insert into Address (street, city, zip_code, contacts_id) values ('${data.street}','${data.city}','${data.zip_code}','${data.contacts_id}')`;
    conn.run(query)
  }
  
  static update(conn, id, data){
    let query = `update Address set street='${data.street}', city = '${data.city}', zip_code='${data.zip_code}', contacts_id='${data.contacts_id}' where id='${id}'`;
    conn.run(query);
  }
  
  static delete(conn, id){
    let query = `delete from 'Address' where id='${id}'`;
    conn.run(query);
  }
  
  static selectContactAddress(conn){
    return new Promise(function(resolve, reject){
      let query = `select address.id, address.street, address.city, address.zip_code, Contacts.name, Contacts.company from Address join Contacts on contacts_id = Contacts.id`;
      conn.all(query, function(err, rows){
        if (!err) resolve(rows);
        else reject(err);
      });
    });
  };
}

module.exports = Address;
