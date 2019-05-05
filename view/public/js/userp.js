'use strict';
let udata = null;
alert('Success');

const ud = fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  udata = json;
  console.log(udata.UserName);
  //showHide(json);
});

const showname = () => {
  ud();
  const heyuser = document.createElement('p');
  heyuser.innerText = 'Welcome' + udata.UserName;
  const bod = document.getElementsByTagName('body');
  bod.appendChild(heyuser);
};