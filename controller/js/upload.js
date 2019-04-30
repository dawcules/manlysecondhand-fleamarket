/*'use strict';

const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({dest: 'Testisaitti/public/uploads'});

app.use(express.static('Testisaitti/public'));

<<<<<<< HEAD

app.get('/image', (req, res) => {
  res.sendFile(__dirname + 'index.html');
=======
app.get('/', (req, res) => {
<<<<<<< HEAD
  //res.sendFile('view/public/index.html');
  res.send('Very likely we will never print that message if we already send stuff back to user\'s browser...');
=======
  res.sendFile('view/public/index.html');
>>>>>>> 2accb5dc694a3f49f073a7bca413ff5d0093fe56
  res.json({message: 'Toimiiko?'})
>>>>>>> 86fb9bc7a0ee6a35075f0eaf4920aeefe796c61b
});

app.post('/test', upload.single('myImages') , (req, res) =>{
  const data = {
    message: 'File upload successful',
    file: req.file,
  };
});

app.listen(3000); */