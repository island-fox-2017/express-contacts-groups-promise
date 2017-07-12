const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();

var index = require ('./routers/index')
var contact = require ('./routers/contacts')
var profile = require ('./routers/profile')
var address = require ('./routers/address')
var group = require ('./routers/groups')
var contactgroup = require ('./routers/contactgroup')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', index);
app.use('/contacts', contact);
app.use('/profile', profile)
app.use('/address', address)
app.use('/groups', group);
app.use('/contactgroup', contactgroup)

app.listen(3000);
