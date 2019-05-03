'use strict';

app.use(session({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));

const uname = req.session.user.UserName;

alert('Hello' + uname);