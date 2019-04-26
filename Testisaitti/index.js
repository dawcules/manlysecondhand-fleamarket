'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'iliasd',
  password: 'Kanta13',
  database: 'kirppis'
});
const fs      = require('fs');
const https   = require('https');
const bodyParser = require('body-parser');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic






console.log('Server is starting');
console.log('Rullaa');
