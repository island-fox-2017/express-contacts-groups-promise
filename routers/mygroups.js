const express = require('express');
var router = express.Router();
const MyGroup = require('../models/mygroups');
const dbModel = require('../models/dbModel');
const Group = require('../models/group');
const Contact = require('../models/contact');
let dataModel = new dbModel('./db/data.db')
let koneksi = dataModel.connection

router.get('/', function (req, res) {
  MyGroup.showData(koneksi)
    .then(function (data) {
      // console.log(data);
      Contact.readData(koneksi)
        .then(function (kontak) {
          // console.log(kontak);
          Group.readData(koneksi)
            .then(function (group) {
              res.render('my_group', {grouping_data: data, datakontak: kontak, datagroup: group})
            })
        })
    })
    .catch(function () {
      res.send(`Ada eror pada ${err}`)
    })
})

router.post('/', function(req, res) {
  MyGroup.insertData(dataModel.connection, req.body);
    res.redirect('/my-contact-groups')
})

module.exports = router
