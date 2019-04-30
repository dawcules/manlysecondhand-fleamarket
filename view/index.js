'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const db = require('../utils/DBConnection');
const LocalStrategy = require('passport-local').Strategy;

//Database Connection. use .env or modify DBConnection.js to use your own login information
const connection = db.connect();
/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'iliasd',
  password: 'Kanta13',
  database: 'kirppis'
});
*/
const fs      = require('fs');
const https   = require('https');
const bodyParser = require('body-parser');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};

app.use(require('serve-static')(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log(`login? ${username}`);
      // Normally, select * from users where username=?
      if (username !='tester' && password !='test123') {
        return done(null,false);
      }
      return done(null, {name: username});
    }
));
passport.serializeUser((user, done) => {
  done (null, user)
});

passport.deserializeUser((id, done) => {
  return user;
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: 'login.html' }),
    function(req, res) {
      res.redirect('/userpage.html');
    });

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic

console.log('Server is starting');
console.log('Rullaa');
