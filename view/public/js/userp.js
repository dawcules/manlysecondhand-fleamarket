'use strict';

alert('Success');
fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  //showHide(json);
});
