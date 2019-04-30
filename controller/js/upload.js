'use strict';

const express = require('express');
const multer = require('multer');
const app = Express();

const upload = multer({dest: 'public/uploads/'});

app.get('/', (req, res) => {
  res.sendFile('view/public/index.html');
  res.json({message: 'Toimiiko?'})
});

app.post('public/uploads', upload.multiple('myImages', 10), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error)
  }
  res.send(files);

  res.redirect('/app')

});


app.listen(3000);