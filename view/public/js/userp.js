'use strict';
let udata = null;
alert('Success');

fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  udata = json;
  console.log(udata.UserName);
  //showHide(json);
});
