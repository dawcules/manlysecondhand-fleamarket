'use strict';

fetch('getproduct', {
  method: "post",
  body: JSON.stringify({
    brand: Nike
  })
}).then((res) => {
  return res.json();
}).then((json) => {
  const pdata = json;
  const desc = document.createElement('p');
  const title = document.createElement('h2');

  desc.setAttribute('id','title');
  desc.innerText = pdata.Description ;
  title.innerText = pdata.pName;

  const dv = document.querySelector('div');
  dv.appendChild(desc);
  dv.appendChild(title);
  //tänne printit
});