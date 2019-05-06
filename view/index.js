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
const upload = multer({dest: 'public/uploads/'});

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
  res.redirect('/app/userpage.html');
});

app.use('/product', (req, res) => {
            // lisää tuotteen tiedot tietokantaan //name, brand, description, "not",condition,ptype,price, "8"
            const data = [
                req.body.name,
                req.body.brand,
                req.body.description,
                "not",
                req.body.condition.parseInt(),
                req.body.ptype,
                req.body.price.parseInt(),
                8, // dummy userID
                ];
            console.log(data);
                query.insertProduct(data, res);
});

app.post('/image', upload.single('imgA'), (req, res, next) => {
    next();
});

app.use('/image', (req, res, next) => {
    // tee pieni thumbnail
    resize.makeResize(req.file.path, 300, '/app/thumbs/' + req.file.filename).
    then(data => {
        next();
    });
});

app.use('/image', (req, res, next) => {
    // tee iso thumbnail
    resize.makeResize(req.file.path, 640, '/app/medium/' + req.file.filename).
    then(data => {
        next();
    });
});

app.use('/image', (req, res, next) => {
    // lisää kuvan tiedot tietokantaan
    //Title, Location, Alt, Thumb, Medium, pID
    const data = [
        req.body.title,
        'uploads/' + req.file.filename,
        req.body.title,
        'thumbs/' + req.file.filename,
        'medium/' + req.file.filename,
        1, // dummy product ide
    ];
    query.insertImage(data, res);
    console.log(data)
});
app.post('/uploads', upload.single('myImages'),(req, res) =>{
    res.send('Upload successful', req.file);
});

app.get('/getsession', (req, res) => {
  res.json(req.session.user);
});

app.get('/getproduct', (req, res, callback) => {
  console.log('1. Funktio alkaa');
  const data = [2];
  const q = query.selectProductInfo(data, res);
  console.log('2. queryn jälkeen');
  console.log('3. tulos on ' + q);
  console.log('4. käyttäjä on: ' + q[0]);
  res.send(q);
});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic

console.log('Server is starting');
console.log('Rullaa');