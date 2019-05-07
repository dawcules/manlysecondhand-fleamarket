const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbq = require('./DB_Query');

passport.serializeUser((user, done) => {
  console.log('serialize:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Here we go: ' + username);
      let res = null;

      const doLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          console.log('username b4 sql is: ' + username);
          dbq.loginUser([username], (result) => {
            bcrypt.compare(password, result[0].Password, (err, res) => {
              // res == true
              if (res) {
                console.log('1');
                resolve(result);
              } else {
                reject(err);
              }
            });
          });
        });
      };
      console.log('2');
      return doLogin(username, password).then((result) => {
        console.log('3');
        if (result.length < 1) {
          console.log('undone');
          return done(null, false);
        } else {
          console.log('done');
          delete result[0].Password; // remove password from user's data before sending it to frontend
          return done(null, result[0]); // result[0] is user's data, accessible as req.user
        }
      }).catch(err => {
        console.log('err', err);
      });
    },
));

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('user is ' + user);
    if (err) {
      return next(err);
    }
    if (!user) { // if login not happening
      console.log('log in failed');
      return res.sendStatus(403); // http code forbidden
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('logged in ok');
      //res.redirect('../../view/public/userpage.html');
      req.session.user = user;
      req.session.save();
      /*res.send(req.user);*/ // if login succesful, send user object
     return res.redirect('user');
      // KÄYTÄ LIIKENNE INDEX.JS KAUTTA KOSKA SIPULI????
    });
  })(req, res, next);
};

// register
const register = (req, res, next) => {
  console.log(req.body);
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    console.log('hash', hash);
    //INSERT INTO User (UserName, Password, Email, Phone, Location, typeID) VALUES (?, ?, ?, ?, ?, ?);',
    dbq.registerUser([req.body.username, hash, req.body.email, req.body.phone, req.body.location, 0], next);
  });
};

// function to check if the user has logged in, to be used in middleware
const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log(req.user);
    res.sendStatus(403);
  }
};

module.exports = {
  login: login,
  register: register,
  loggedIn: loggedIn,
};
