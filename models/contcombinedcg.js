class contcombinedCG {

  static findAll(con) {
    return new Promise(function(resolve, reject) {
    con.all(` SELECT  * FROM Contact JOIN CG ON Contact.id  = CG.ContactID JOIN ContactGroup ON ContactGroup.id  = CG.GroupID `, function (err,rows) {
      if(!err)
      {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  }
  )};

  static deleteCont(con, ident){
    con.all(`DELETE FROM CG WHERE ContactID = '${ident}'`);
  }


}

module.exports = contcombinedCG;
