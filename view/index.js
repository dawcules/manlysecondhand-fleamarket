'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const multer = require('multer');
const passport = require('passport');
const db = require('../model/utils/DBConnection');
const dbquery = require('../model/utils/DB_Query');
const resize = require('../model/utils/ResizeImage');
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

/*passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log(`login? ${username}`);
      // Normally, select * from users where username=?
      if (dbquery.getusername(username,connection && password==dbquery.getpassword(username,connection)) {
        return done(null,false);
      }
      return done(null, {name: username});
    }
));*/

passport.serializeUser((user, done) => {
  done (null, user)
});

passport.deserializeUser((id, done) => {
  return user;
});

app.post('/login',
    (req, res) => {
      let passi;
      const unamedata = [req.body.username];
      //const useri = dbquery.getusername(unamedata,connection,res);
      //const passu = dbquery.getpassword(unamedata,connection,res);
      //console.log(useri);
      //passport.authenticate('local', { failureRedirect: 'login.html' }, res);

      const loginatt = connection.query('SELECT * FROM User WHERE UserName =?;', unamedata[0], (error, results, fields) => {
        if (results[0].Password === req.body.password) {
          console.log()
        return 'true';
        }
        if (error) throw error;
      });
      console.log(' Kirjautumistilanne = ' + loginatt);

      if (loginatt == 'true') {
  res.redirect('userpage.html');
}
      else {
        console.log("Ei toimi login")
      }
    });

app.post('/register',
    (req, res) => {
    //'INSERT INTO User (UserName, Password, Email, Phone, Location, typeID) VALUES (?, ?, ?, ?, ?, ?);'
      const data = [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.location, 0];
      dbquery.insertUser(data, connection, res);
      console.log(req.body.email);
    });

const upload = multer({dest: 'uploads/'});

app.use(express.static('public'));

app.get('/', (req, res) => {
  //res.sendFile('view/public/index.html');
  res.send('Very likely we will never print that message if we already send stuff back to user\'s browser...');
});

app.post('/upload', upload.single('myImages') , (req, res) =>{
  const data = {
    message: 'File upload successful',
    file: req.file,
  };
  res.send(data);
});



app.use('/image', (req, res, next) => {
    // tee pieni thumbnail
    resize.makeResize(req.file.path, 300, './public/thumbs/' + req.file.filename).
    then(data => {
        next();
    });
});

app.use('/image', (req, res, next) => {
    // tee iso thumbnail
    resize.makeResize(req.file.path, 640, './public/medium/' + req.file.filename).
    then(data => {
        next();
    });
});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic

console.log('Server is starting');
console.log('Rullaa');
