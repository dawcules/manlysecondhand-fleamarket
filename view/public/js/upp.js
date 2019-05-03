'use strict';

const form = document.querySelector('form');

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object
const message =document.getElementById('message');
const image = document.getElementById('imgupload');
// make function 'upload' which
const sendForm = (evt) => {
  // - prevents the form from sending
  evt.preventDefault();
// - makes FormData -object and adds the file selected byt the user into the object
const fd = new FormData(form);
// - send the file to the same url as in task a by using fetch -method
const options = {
    method: 'POST',
    body: fd,
  };

  fetch('./image',options)
  .then(response =>{
    return response.json();
  })
  .then(json => {
    console.log(json);
    message.innerHTML = json.message;
   image.src = './uploads' + json.file.filename;
  });
};
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
form.addEventListener('submit', upload);