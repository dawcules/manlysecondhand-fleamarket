'use strict';

const express = require('express');
const multer = require('multer');
const app = Express();

const upload = multer({dest: 'public/uploads/'
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + 'index.html');
  res.json({message: 'Toimiiko?'})
});

app.post('public/uploads', upload.single('my-img'), (req, res) => {

  res.redirect('/app')
});
app.listen(3000);