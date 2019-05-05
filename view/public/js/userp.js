'use strict';
let uname = null;
alert('Success');

fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  uname = json.UserName;
  console.log(uname);
  //showHide(json);
});
