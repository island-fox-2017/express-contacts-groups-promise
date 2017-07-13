//manipulasi object rows
rows.forEach(row => {
  //query untuk get contact berdasarkan id nya
  db.each(`SELECT * FROM Contacts WHERE id = ${row.Contact_id}`, (err, data_contact) => {
    row['name'] = data_contact.name
    row['company'] = data_contact.company
    row['group'] =
  });
});
