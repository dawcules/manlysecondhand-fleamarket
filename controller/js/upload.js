/*'use strict';

const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({dest: 'Testisaitti/public/uploads'});

app.use(express.static('Testisaitti/public'));

app.get('/', (req, res) => {
  //res.sendFile('view/public/index.html');
  res.send('Very likely we will never print that message if we already send stuff back to user\'s browser...');
});

app.post('/test', upload.single('myImages') , (req, res) =>{
  const data = {
    message: 'File upload successful',
    file: req.file,
  };
});

app.listen(3000); */