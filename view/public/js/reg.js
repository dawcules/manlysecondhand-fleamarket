'use strict';

const rformi = document.querySelector('#rform');

const userN = document.getElementById('uname');
const pass = document.getElementById('passw');
const email = document.getElementById('eml');
const phone = document.getElementById('pnumber');
const location = document.getElementById('loc');


function validat(){
  if( userN.value === "" ) {
    alert( "Please provide your name!" );
    userN.focus() ;
    return false;
  }
  if( pass.value === "" ){
    alert( "Please enter your password!" );
    pass.focus() ;
    return false;
  }
  if( email.value === "") {
    alert( "Please enter your email" );
    email.focus() ;
    return false;
  }
  if( phone.value === "" || phone.value.toString() ){
    alert( "Please enter a valid phone number!" );
    return false;
  }
  if (location.value === "" ){
    alert( "Please provide your location!" );
    location.focus() ;
    return false;
  }else {
    return true;
  }
}







rformi.addEventListener('submit', (evt) => {
  evt.preventDefault();
});