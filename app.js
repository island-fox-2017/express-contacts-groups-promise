'use strict'

var express = require('express')
var app = express()

var ejs = require('ejs')
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database/data.db')

var dbModel = require('./models/dbModel')
var contactModel = require('./models/contactModel')
var groupModel = require('./models/groupModel')
var profileModel = require('./models/profileModel')
var addressModel = require('./models/addressModel')

var indexRouter = require('./routers/index')
var contactRouter = require('./routers/contact')
var groupRouter = require('./routers/group')
var profileRouter = require('./routers/profile')
var addressRouter = require('./routers/address')

app.use('/', indexRouter)
app.use('/', contactRouter)
app.use('/', groupRouter)
app.use('/', profileRouter)
app.use('/', addressRouter)


// buat skema DBnya setiap app.js di-run (jika tabel2nya belum ada)
var connector = new dbModel('./database/data.db')
connector.createTable()


app.listen(3000)
