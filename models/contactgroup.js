class Contactgroup {
  constructor(data) {
    this.contact_id = data.contact_id;
    this.group_id = data.group_id;
  }

  static showAllDataContactGroup(conn, callback) {
    conn.all(`select contactgroup.id as contactgroupID, contacts.id as contact_id, contacts.first_name || ' ' || contacts.last_name as long_name, groups.id as group_id, groups.name_group as group_name from contactgroup
  join contacts
  on contactgroup.contact_id = contacts.id
  join groups
  on contactgroup.group_id = groups.id`, function(error, rows) {
      if (!error) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

  static showDataContactGroupsById (conn, param, callback) {
    conn.all(`SELECT * FROM contactgroup WHERE id = ${param}`, function(error, rows) {
      if (!error) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static updateDataContactGroupsById(conn, data, param) {
    conn.run(`UPDATE contactgroup set contact_id = '${data.contact_id}', group_id = '${data.group_id}' WHERE id = ${param}`)
  }

  static forSelectOptionByContactId(conn, callback) {
    conn.all(`SELECT id, first_name || ' ' || last_name as long_name FROM contacts`, function(error, rows2) {
      if (!error) {
        callback(false, rows2)
      } else {
        callback(true, null)
      }
    })
  }

  static forSelectOptionByGroupId(conn, callback) {
    conn.all(`SELECT * FROM groups`, function(error, rows3) {
      if (!error) {
        callback(false, rows3)
      } else {
        callback(true, null)
      }
    })
  }

  static insertDataContactGroup(conn, data) {
    conn.run(`INSERT INTO contactgroup (contact_id, group_id)
    VALUES ('${data.selectIdContact}', '${data.selectIdGroup}')`);
  }

  static deleteDataContactGroupById(conn, param) {
    conn.run(`DELETE FROM contactgroup WHERE id = ${param}`)
  }

}

module.exports = Contactgroup
