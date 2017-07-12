class combinedCG {


  static findAll(con) {
    return new Promise(function(resolve, reject) {
    con.all(`SELECT  * FROM ContactGroup JOIN CG ON ContactGroup.id  = CG.GroupID JOIN Contact ON CG.ContactID  = Contact.id`, function (err,rows) {
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
    con.all(`DELETE FROM CG WHERE GroupID = '${ident}'`);
  }

}

module.exports = combinedCG;
