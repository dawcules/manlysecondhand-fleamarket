'use strict';

alert('Success');
fetch('/getsession', {
  credentials: 'include'
}).then((res) => {
  return response.json();
}).then((json) => {
  console.log(json);
  //showHide(json);
});
