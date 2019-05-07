'use strict';
const form = document.querySelector('form');
const dynamic = document.querySelector('#dynamic'); // muutettava hakukenttä
const brandButton = document.querySelector('#pbrand');
const priceButton = document.querySelector('#pprice');
const condButton = document.querySelector('#pcond');
const typeButton = document.querySelector('#ptype');

const brandlist = ['Nike','Adidas','Reebok'];
const typelist = ['Shirts','Pants','Coats','Accessories'];
let brandoptions = [];
let typeoptions = [];
const select = document.createElement('select');
const priceDiv = document.createElement('div');
const priceMin = document.createElement('input');
const priceMax = document.createElement('input');

const condMin = document.createElement('input');
const condMax = document.createElement('input');
const condDiv = document.createElement('div');


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

const showBrand = (evt) => {
  if (brandoptions.length == 0) {
    console.log('Tässä merkki');
    console.log(brandlist.length);
    for (let i=0;i < brandlist.length;i++) {
      console.log('listan 1 ' + i);
      brandoptions[i] = document.createElement('option');
      brandoptions[i].innerText = brandlist[i];
      brandoptions[i].value = brandlist[i];
    }
    if (select.childElementCount === 0) {
      for (let i = 0; i < brandoptions.length; i++) {
        console.log('listan 2 ' + i);
        select.appendChild(brandoptions[i])
      }
    }
    select.setAttribute('id','brandname');
    dynamic.appendChild(select)
  }
  if (select.style.display != 'inline') {
    select.style.display = 'inline'
  }
  else {
    select.style.display = "none";
  dynamic.removeChild(select);
    brandoptions = [];
  }
};

const showPrice = (evt) => {
  if (document.querySelector('#pricediv')) {
    priceDiv.style.display = "none";
    dynamic.removeChild(priceDiv);
  }
  else {
    priceMin.setAttribute('type', 'number');
    priceMin.setAttribute('placeholder', 'Price min');
    priceMax.setAttribute('type', 'number');
    priceMax.setAttribute('placeholder', 'Price max');
    priceDiv.setAttribute('id','pricediv');
    priceDiv.appendChild(priceMin);
    priceDiv.appendChild(priceMax);
    dynamic.appendChild(priceDiv);
    priceDiv.style.display = "inline";
    console.log('Tässä hinta');
  }
};

const showCond = (evt) => {
  if (document.querySelector('#conddiv')) {
    condDiv.style.display = "none";
    dynamic.removeChild(condDiv);
  }
  else {
    condMin.setAttribute('type', 'number');
    condMin.setAttribute('placeholder', 'Condition min');
    condMax.setAttribute('type', 'number');
    condMax.setAttribute('placeholder', 'Condition max');
    condDiv.setAttribute('id','conddiv');
    condDiv.appendChild(condMin);
    condDiv.appendChild(condMax);
    dynamic.appendChild(condDiv);
    condDiv.style.display = "inline";
    console.log('Tässä hinta');
  }

};

const showType = (evt) => {
  console.log('Tässä tyyppi');
  if (typeoptions.length == 0) {
    console.log(typelist.length);
    for (let i=0;i < typelist.length;i++) {
      console.log('listan 1 ' + i);
      typeoptions[i] = document.createElement('option');
      typeoptions[i].innerText = typelist[i];
      typeoptions[i].value = typelist[i];
    }
    if (select.childElementCount === 0) {
      for (let i = 0; i < typeoptions.length; i++) {
        console.log('listan 2 ' + i);
        select.appendChild(typeoptions[i])
      }
    }
    select.setAttribute('id','brandname');
    dynamic.appendChild(select)
  }
  if (select.style.display != 'inline') {
    select.style.display = 'inline'
  }
  else {
    select.style.display = "none";
    dynamic.removeChild(select);
    typeoptions = [];
  }
};


form.addEventListener('submit', getprd);
brandButton.addEventListener('click', showBrand);
priceButton.addEventListener('click', showPrice);
condButton.addEventListener('click', showCond);
typeButton.addEventListener('click', showType);

