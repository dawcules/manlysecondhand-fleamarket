'use strict';
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const resize = require('../model/utils/resize');
const pass = require('../model/utils/pass');
const query = require('../model/utils/DB_Query');
const fs      = require('fs');
const https   = require('https');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};
//Setting storage to store the files
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}); */ //Uploading file
//const upload = multer({storage: storage});
app.use(express.static('view/public'));
app.use(require('serve-static')(__dirname + './public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  //cookie: {secure: false},
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', pass.login, (req, res) => {
  console.log('login consolessa on käyty');
  console.log(req.session.user);
});
app.post('/register', pass.register, pass.login);

//Handling post form when form is submitted
const upload = multer({dest: 'view/public/uploads/'});

/*
app.get('/', (req, res) => {
  res.send('This is a test!');
  //res.render('index');
  //res.sendfile('view/public/index.html');
});
*/

app.get('/user', pass.loggedIn, (req, res) => {
  const sess = req.session.user;
  console.log('userp app käyty');
  console.log(sess.UserName);
  res.send(sess);
  /*res.redirect('/app/index.html');*/
});

app.use('/product', (req, res) => {
            // lisää tuotteen tiedot tietokantaan
            const data = [
                req.body.name,
                req.body.brand,
                req.body.description,
                "not",
                parseInt(req.body.condition),
                req.body.ptype,
                parseInt(req.body.price),
                8, // dummy userID
                ];
                console.log(data);
                query.insertProduct(data, res);
});

app.post('/image', upload.single('imgA'), (req, res, next) => {
    console.log("adding the image");
    next();
});
app.use('/image', (req, res, next) => {
    // tee pieni thumbnail
    resize.makeResize(req.file.path, 300, 'view/public/thumbs/' + req.file.filename).then(data => {
        next();
    });
});

app.use('/image', (req, res, next) => {
    // tee iso thumbnail
    resize.makeResize(req.file.path, 640, 'view/public/medium/' + req.file.filename).
    then(data => {
        next();
    });
});
app.use('/image', (req, res, next) => {
    // lisää kuvan tiedot tietokantaan
    //Title, Location, Alt, Thumb, Medium, pID
    console.log("adding image to the database")
    const data = [
        req.body.title,
        'uploads/' + req.file.filename,
        req.body.title,
        'thumbs/' + req.file.filename,
        'medium/' + req.file.filename,
        2, // dummy product ide
    ];
    query.insertImage(data, res);
    console.log(data)
});
app.get('/getsession', (req, res) => {
  res.json(req.session.user);
});

app.post('/getproduct', (req, res) => {
  console.log('1. Funktio alkaa');
  const data = req.body.searchp.toString();
  const qdata = data.split(",");
  const mysql = 'SELECT * FROM Product WHERE ';
  let q0;
  let q1;
  let q2;
  let q3;

  if (qdata[0] != '*') {
    q0 = 'pType = ' + qdata[0]
  }
  else {
    q0 = ''
  }
  if (qdata[1] != '*') {
    q1 = ' AND pBrand = ' + qdata[1]
  }
  else {
    q1 = ''
  }
  if (qdata[2] != '*') {
    q2 = ' AND pCondition BETWEEN ' + qdata[2] + ' AND 10'
  }
  else {
    q2 = ''
  }
  if (qdata[3] != '*' && qdata[4] != '*') {
    q3 = ' AND Price BETWEEN ' +qdata[3] + ' AND ' +qdata[4]
  }
  else {
    q3 = ''
  }

  const sql = [mysql+q0+q1+q2+q3+';'];
  console.log(sql);


  query.selectProductInfo(sql, (result) => {
  console.log('2. queryn jälkeen');
  res.send(result);
})});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic

console.log('Server is starting');
console.log('Rullaa');

//testi commit