'use strict';

fetch('getproduct')
  //tänne jonneki muuttujat hakuun
.then((res) => {
  return res;
}).then((res) => {
  console.log(res.body);
  const pdata = res;
  const title = document.createElement('p');
  title.setAttribute('id','title');
  title.innerText(pdata.Description);
  const dv = document.querySelector('div');
  dv.appendChild(title);
  //tänne printit
});