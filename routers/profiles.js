var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DbModel');
const dProfile = require('../models/profiles');
let dbModel = new ModelDb('./db/data.db');

//Profile Setting
router.get('/', function (req, res) {
  dProfile.showProfiles(dbModel.connection)
  .then(function(data){
    dProfile.showNameContact(dbModel.connection)
    .then(function(data2){
      res.render('profiles', {profile_data: data, contact_data: data2})
    })
  })
  .catch(function(err) {
    console.log(err);
  })
})

router.post('/', function (req, res) {
  dProfile.insertProfiles(dbModel.connection, req.body);
  // db.run(`INSERT INTO Profile (username, password, contact_id)
  // VALUES ('${req.body.nama_user}', '${req.body.pass}', '${req.body.kontak_id}' )`);
    res.redirect('/profiles');
})



//Profile Edit
router.get('/edit/:id', function(req, res) {
  dProfile.editProfiles(dbModel.connection, req.params)
  .then(function(data) {
    dProfile.showNameContact(dbModel.connection, req.params)
    .then(function(data2) {
      res.render('edit_profile', {profile_data: data, contact_data: data2})
    })
  })
  .catch(function(err) {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  dProfile.updateProfiles(dbModel.connection, req.body, req.params)
  // db.run(`UPDATE Profile SET username='${req.body.nama_user}', password='${req.body.pass}'  WHERE id=${req.params.id}`)
  res.redirect('/profiles')
})

//Profile Delete
router.get('/delete/:id', function(req, res) {
  dProfile.deleteProfiles(dbModel.connection, req.params)
  // db.run(`DELETE FROM Profile WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/profiles')
})


module.exports = router
