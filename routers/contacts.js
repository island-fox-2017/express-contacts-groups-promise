const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel'); //Lib of db_model functions with instantiate
const Contact = require('../models/contacts'); //Lib of Contact class functions without instantiate

//INSTANTIATE
let dbModel = new DbModel('./db/data.db');

//CONTACTS PAGE
router.get('/', (req, res) => {
  Contact.findAll(dbModel.connection, function(err, rows) {
    if (!err) {
      res.render('contacts', {
        data_contacts: rows
      });
    }
  });
});
