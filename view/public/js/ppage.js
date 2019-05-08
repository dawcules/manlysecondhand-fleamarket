'use strict';
const form = document.querySelector('#search');
const dynamic = document.querySelector('#dynamic'); // muutettava hakukenttä
const dv = document.getElementById('ppage');
const brandButton = document.querySelector('#pbrand');
const priceButton = document.querySelector('#pprice');
const condButton = document.querySelector('#pcond');
const typeButton = document.querySelector('#ptype');

const brandlist = ['Nike','Adidas','Reebok', 'Puma'];
const typelist = ['Shirt','Pants','Coat','Accessory','Shoes', 8, 5];
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
  dv.innerHTML="";

  const brand = document.getElementById('brandname');
  const type = document.getElementById('typename');
  const cond = document.getElementById('condname');
  const minPrice = document.getElementById('pricemin');
  const maxPrice = document.getElementById('pricemax');

 /* const selectedType = ;
  const selectedBrand = [;
  const selectedCond = ;
  const selMinPrice =
  const selMaxPrice = maxPrice.value;*/
  const searchdata = []; // iffillä kamat sisään

  let qDesc = [];
  let qImg = [];
  let qCond = [];
  let qPrice = [];
  let qBrand = [];
  let qName = [];
  let qAdded = [];
  let qDescEle = [];
  let qImgEle = [];
  let qCondEle = [];
  let qPriceEle = [];
  let qBrandEle = [];
  let qNameEle = [];
  let qAddedEle = [];



  if (type) {
    searchdata.push([type.options[type.selectedIndex].value]);
  }
  else {
    searchdata.push('*')
  }
  if (brand) {
    searchdata.push([brand.options[brand.selectedIndex].value]);
  }
  else { console.log(searchdata.push('*'));
  }
  if (cond) {
  searchdata.push([cond.options[cond.selectedIndex].value])
  }
  else {
    searchdata.push('*')
  }
  if (minPrice) {
    searchdata.push([minPrice.value]);
  }
  else {
    searchdata.push('*')
  }
  if (maxPrice) {
    searchdata.push(maxPrice.value);
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
    console.log('json' + json);

    const pdata = json;
    for (let i=0;pdata.length>i;i++) {
      qDesc.push(pdata[i].Description);
      qImg.push(pdata[i].Thumb);
      qCond.push(pdata[i].pCondition);
      qPrice.push(pdata[i].Price);
      qBrand.push(pdata[i].pBrand);
      qName.push(pdata[i].pName);
      qAdded.push(pdata[i].ProductAdded);
    }
    console.log('qDesc ' + qDesc);

    for (let i=0;qDesc.length>i;i++) {
      qNameEle[i] = document.createElement('h1');
      qNameEle[i].innerText = qName[i];
      qImgEle[i] = document.createElement('img');
      qImgEle[i].setAttribute('src',qImg[i]);
      qDescEle[i] = document.createElement('p');
      qDescEle[i].innerText = qDesc[i];
      qCondEle[i] = document.createElement('h3');
      qCondEle[i].innerText = qCond[i];
      qPriceEle[i] = document.createElement('p');
      qPriceEle[i].innerText = qPrice[i] + ' €'
      qBrandEle[i] = document.createElement('h2');
      qBrandEle[i].innerText = qBrand[i];
      qAddedEle[i] = document.createElement('p');
      qAddedEle[i].innerText = qAdded[i];
    }


    for (let i=0;qDescEle.length>i;i++) {
      const pid = document.createElement('div');
      pid.setAttribute('id','productdiv' + i);

      pid.appendChild(qNameEle[i]);
      pid.appendChild(qImgEle[i]);
      pid.appendChild(qDescEle[i]);
      pid.appendChild(qCondEle[i]);
      pid.appendChild(qPriceEle[i]);
      pid.appendChild(qBrandEle[i]);
      pid.appendChild(qAddedEle[i]);
      pid.style.border = '2px solid black';
      dv.appendChild(pid);
    };
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
    selectCond.style.display = "none";
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