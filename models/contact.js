class Contact {
  constructor(dataContact){
    this.id = dataContact.id;
    this.Name = dataContact.Name;
    this.Company = dataContact.Company;
    this.Telp = dataContact.Telp;
    this.Email = dataContact.Email;
  }
  static findAll(con) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT * FROM Contact`, function (err,rows) {
      if(!err)
      {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  }
  )};

  static AddNew(con, data) {
    con.all(`INSERT INTO Contact(Name, Company, Telp, Email) VALUES ('${data.name}', '${data.company}', '${data.telp}', '${data.email}')`);
  }

  static edit(con, ident) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT * FROM Contact WHERE id = '${ident}'`, function (err,rows) {
        if(!err)
        {
              resolve(rows)
            } else {
              reject(err)
            }
          })
        }
        )};

  static updateEdit(con, ident, data) {
    con.all(`UPDATE Contact SET Name = '${data.Name}', Company = '${data.Company}', Telp = '${data.Telp}', Email = '${data.Email}' WHERE id = ${ident}`);
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM Contact WHERE id = '${ident}'`);
  }

  static findAdd(con, ident) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT * FROM Contact JOIN Address ON Address.Contact_id = Contact.id WHERE Contact.id = ${ident}`, function (err,rows) {
          if(!err)
          {
            resolve(rows)
          } else {
            reject(err)
          }
        })
      }
      )};


}

module.exports = Contact;
