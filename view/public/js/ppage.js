'use strict';
const form = document.querySelector('form');
const getprd = (evt) => {

  evt.preventDefault();
  const brand = document.getElementById('brandname');
  const selected = brand.options[brand.selectedIndex].value;
  console.log('selected brand ' + selected);








  fetch('getproduct', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchp: selected
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

    const dv = document.getElementById('ppage');
    dv.appendChild(desc);
    dv.appendChild(title);
    //tänne printit
  });
};

form.addEventListener('submit', getprd);
