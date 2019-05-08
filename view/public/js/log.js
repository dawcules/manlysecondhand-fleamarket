'use strict';

const logForm = document.querySelector('#lform');

const usr = document.getElementById('usn');
const pswd = document.getElementById('psw');


function vld() {
  if (usr.value === "") {
    alert("Enter your username!");
    usr.focus();
    return false;
  }
  if (pswd.value === "") {
    alert("Enter your password!");
    pswd.focus();
    return false;
  } else {
    return true;
  }
}

  logForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });