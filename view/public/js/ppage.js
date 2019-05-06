'use strict';

fetch('getproduct', {
  credentials: 'include'
  //tänne jonneki muuttujat hakuun
}).then((res) => {
  return res.json();
}).then((json) => {
  const pdata = json;
  const title = document.createElement('p');
  title.setAttribute('id','title');
  title.innerText(pdata.Description);
  const dv = document.querySelector('div');
  dv.appendChild(title);
  //tänne printit
});