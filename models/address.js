class Address {
  constructor(){

  }

  static createTable(){

  }

  static insertData(db, data){
    db.run(`INSERT INTO ADDRESS (street, city, zip_code, contact_id) VALUES ('${data.street}', '${data.city}', '${data.zip_code}', '${data.contact_id}')`);
  }

  static readData(db,callback){
    db.all(`select * from ADDRESS`, function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static readUpdateData(db, params, callback){
    db.all(`select * from ADDRESS where id=${params.id}`,function (err, data) {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static updateData(db, data, params){
    db.run(`UPDATE ADDRESS SET
      street='${data.street}',
      city='${data.city}',
      zip_code=${data.zip_code} 
      WHERE id=${params.id}`);

  }

  static deleteData(db, params){
    console.log(`delete from ADDRESS  where id=${params.id};`);
    db.run(`delete from ADDRESS  where id=${params.id};`);
  }

}

module.exports = Address
