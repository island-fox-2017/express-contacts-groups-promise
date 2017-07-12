const DbModel = require('./DbModel')

class GroupsDetail {
  constructor(data){
  }
  
  static showGroupDetail(conn, callback){
    conn.all(`SELECT Groups.id, Contacts.name, Groups.name_of_group FROM ((Contacts_Groups INNER JOIN Contacts ON Contacts_Groups.Contacts_id = Contacts.id) INNER JOIN Groups ON Contacts_Groups.Groups_id = Groups.id);`, function(err, rows){
      if(!err){
        callback(false,rows)
      } else {
        callback(true, null)
      }
    })
  }
    
}


module.exports = GroupsDetail;
