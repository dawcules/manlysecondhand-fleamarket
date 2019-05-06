'use strict';
let udata = null;
window.alert('Successfully logged in');

fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  udata = json;
  console.log(udata.UserName);
  //showHide(json);
  const heyuser = document.createElement('p');
  heyuser.innerText = 'Welcome ' + udata.UserName;
  const bod = document.querySelector('body');
  bod.appendChild(heyuser);
});



