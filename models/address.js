class Address {
  constructor(dataAdd){
    this.id = dataAdd.id;
    this.Street = dataAdd.Street;
    this.City = dataAdd.City;
    this.ZIPcode = dataAdd.ZIPcode;
    this.Contact_id = dataAdd.Contact_id;
  }

  static findAll(con) {
    return new Promise(function(resolve, reject) {
      con.all(`SELECT * FROM Address`, function (err,rows) {
        if(!err)
          {
            resolve(rows)
          }else{
            reject(err)
          }
      })
    })
  };

  static AddNew(con, data) {
    con.all(`INSERT INTO Address(Street, City, ZIPcode, Contact_id) VALUES ('${data.Street}', '${data.City}', '${data.ZIPcode}', '${data.Contact_id}')`);
  }

  static edit(con, ident) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT * FROM Address WHERE id = '${ident}'`, function (err,rows) {
      if(!err)
        {
          resolve(rows)
        }else{
          reject(err)
        }
    })
  })
  };

  static updateEdit(con, ident, data) {
    con.all(`UPDATE Address SET Street = '${data.StreetEjs}', City = '${data.CityEjs}', ZIPcode = '${data.ZIPcodeEjs}', Contact_id = '${data.Contact_idEjs}' WHERE id = ${ident}`);
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM Address WHERE id = '${ident}'`);
  }

}

module.exports = Address;
