'use strict';
const form = document.querySelector('form');
const dynamic = document.querySelector('#dynamic'); // muutettava hakukenttä
const brandButton = document.querySelector('#pbrand');
const priceButton = document.querySelector('#pprice');
const condButton = document.querySelector('#pcond');
const typeButton = document.querySelector('#ptype');

const brandlist = ['Nike','Adidas','Reebok'];
const typelist = ['Shirts','Pants','Coats','Accessories','Shoes', 8, 5];
const condlist = [1,2,3,4,5,6,7,8,9,10];

let brandoptions = [];
let typeoptions = [];
let condoptions = [];

const selectBrand = document.createElement('select');
const selectType = document.createElement('select');
const selectCond = document.createElement('select');
const priceDiv = document.createElement('div');
const priceMin = document.createElement('input');
const priceMax = document.createElement('input');

const getprd = (evt) => {
  evt.preventDefault();

  const brand = document.getElementById('brandname');
  const type = document.getElementById('typename');
  const cond = document.getElementById('condname');
  const minPrice = document.getElementById('pricemin');
  const maxPrice = document.getElementById('pricemax');

  const selectedType = [type.options[type.selectedIndex].value];
  const selectedBrand = [brand.options[brand.selectedIndex].value];
  const selectedCond = [cond.options[cond.selectedIndex].value];
  const selMinPrice = minPrice.value;
  const selMaxPrice = maxPrice.value;
  const searchdata = [selectedType]; // iffillä kamat sisääN

  if (!selectedBrand) {
    searchdata.push(selectedBrand);
  }
  else {
    searchdata.push('*')
  }
  if (selectedCond) {
    searchdata.push(selectedCond);
  }
  else {
    searchdata.push('*')
  }
  if (selMinPrice) {
    searchdata.push(selMinPrice);
  }
  else {
    searchdata.push('*')
  }
  if (selMaxPrice) {
    searchdata.push(selMaxPrice);
  }
  else {
    searchdata.push('*')
  }
  console.log(searchdata);

  fetch('getproduct', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchp: searchdata

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
    if (selectBrand.childElementCount === 0) {
      for (let i = 0; i < brandoptions.length; i++) {
        console.log('listan 2 ' + i);
        selectBrand.appendChild(brandoptions[i])
      }
    }
    selectBrand.setAttribute('id','brandname');
    dynamic.appendChild(selectBrand)
  }
  if (selectBrand.style.display != 'inline') {
    selectBrand.style.display = 'inline'
  }
  else {
    selectBrand.style.display = "none";
  dynamic.removeChild(selectBrand);
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
    priceMin.setAttribute('id','pricemin');
    priceMax.setAttribute('type', 'number');
    priceMax.setAttribute('placeholder', 'Price max');
    priceMax.setAttribute('id','pricemax');
    priceDiv.setAttribute('id','pricediv');
    priceDiv.appendChild(priceMin);
    priceDiv.appendChild(priceMax);
    dynamic.appendChild(priceDiv);
    priceDiv.style.display = "inline";
    console.log('Tässä hinta');
  }
};

const showCond = (evt) => {
  if (condoptions.length == 0) {
    console.log('Tässä merkki');
    console.log(condlist.length);
    for (let i=0;i < condlist.length;i++) {
      console.log('listan 1 ' + i);
      condoptions[i] = document.createElement('option');
      condoptions[i].innerText = condlist[i];
      condoptions[i].value = condlist[i];
    }
    if (selectCond.childElementCount === 0) {
      for (let i = 0; i < condoptions.length; i++) {
        console.log('listan 2 ' + i);
        selectCond.appendChild(condoptions[i])
      }
    }
    selectCond.setAttribute('id','condname');
    dynamic.appendChild(selectCond)
  }
  if (selectCond.style.display != 'inline') {
    selectCond.style.display = 'inline'
  }
  else {
    selectBrand.style.display = "none";
    dynamic.removeChild(selectCond);
    condoptions = [];
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
    if (selectType.childElementCount === 0) {
      for (let i = 0; i < typeoptions.length; i++) {
        console.log('listan 2 ' + i);
        selectType.appendChild(typeoptions[i])
      }
    }
    selectType.setAttribute('id','typename');
    dynamic.appendChild(selectType)
  }
  if (selectType.style.display != 'inline') {
    selectType.style.display = 'inline'
  }
  else {
    selectType.style.display = "none";
    dynamic.removeChild(selectType);
    typeoptions = [];
  }
};

form.addEventListener('submit', getprd);
brandButton.addEventListener('click', showBrand);
priceButton.addEventListener('click', showPrice);
condButton.addEventListener('click', showCond);
typeButton.addEventListener('click', showType);