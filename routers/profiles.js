var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Profile = require('../models/profile');

let dbModel = new DbModel('data.db');


// PROFILE START HERE
// GET   | /profiles            | tampilin profile
router.get('/', function(req, res){
  Profile.findAllProfiles(dbModel.connection, function(err,rows){
    if(!err) {
      res.render('profiles', {
        panggilData: rows
      })
    }
  })
})

// POST   | /profiles            | Untuk input profile
router.post('/', function(req,res){
  Profile.insertProfiles(dbModel.connection, req.body)
  res.redirect('/profiles')
})

// GET    | /profiles/edit/:id   | Menampilkan data profile spesifik untuk diubah
// POST   | /profiles/edit/:id   | Menerima data form untuk update profile
router.get('/edit/:id', function(req, res){
  Profile.findByIdProfiles(dbModel.connection, req.params.id, function(err,rows){
    if(!err) {
      console.log('.....',rows);
      res.render('editprofile', {
        panggilData: rows
      })
    }
  })
})

router.post('/edit/:id', function(req, res){
  Profile.updateProfiles(dbModel.connection, req.body, req.params.id)
  res.redirect('/profiles');
})

// GET    | /profiles/delete/:id | Menghapus data profile berdasarkan id
router.get('/delete/:id', function(req,res){
  Profile.deleteProfiles(dbModel.connection, req.params.id)
res.redirect('/profiles');
})



module.exports = router
