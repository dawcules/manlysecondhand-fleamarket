'use strict';
// This file contains everything related to fetching and showing product information

// Elements for event listeners
const form = document.querySelector('#search');
const dynamic = document.querySelector('.dynamic');
const dv = document.getElementById('ppage');
const brandButton = document.querySelector('#pbrand');
const priceButton = document.querySelector('#pprice');
const condButton = document.querySelector('#pcond');
const typeButton = document.querySelector('#ptypebut');


// Constant selections for filters. Could be dynamically generated from SQL. But they are not.
const brandlist = ['Nike','Adidas','Reebok', 'Puma'];
const typelist = ['Shirt','Pants','Coat','Accessory','Shoes'];
const condlist = [1,2,3,4,5];
const condnames = ['Very bad', 'Bad', 'Not so good', 'Good', 'Very good'];

//Create buttons with listed values later
let brandoptions = [];
let typeoptions = [];
let condoptions = [];

//Create elements for filter selections
const selectBrand = document.createElement('select');
const selectType = document.createElement('select');
const selectCond = document.createElement('select');
const priceDiv = document.createElement('div');
const priceMin = document.createElement('input');
const priceMax = document.createElement('input');

// Get, create and display products from SQL based on user selected filters
const getprd = (evt) => {

  evt.preventDefault();
  dv.innerHTML=""; // New round => Destroy previous HTML

  //Select all filters by predetermined IDs
  const brand = document.getElementById('brandname');
  const type = document.getElementById('typename');
  const cond = document.getElementById('condname');
  const minPrice = document.getElementById('pricemin');
  const maxPrice = document.getElementById('pricemax');

  const searchdata = []; // Generate searchdata from selected filters

  // Reset all the previous selections
  let qDesc = [];
  let qImg = [];
  let qCond = [];
  let qPrice = [];
  let qBrand = [];
  let qName = [];
  let qAdded = [];
  let qEmail = [];
  let qEmailEle = [];
  let qDescEle = [];
  let qImgEle = [];
  let qCondEle = [];
  let qPriceEle = [];
  let qBrandEle = [];
  let qNameEle = [];
  let qAddedEle = [];


  //Check if selected filter has been selected and push its value to searchdata
  //If filter is not selected (Value = null), place a placeholder '*'
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

  // Fetch information based on selected values. Index.js /getproduct
  fetch('getproduct', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchp: searchdata // == selected filters as an array
    })
  }).then((res) => {
    return res.json();
  }).then((json) => {
    console.log('json' + json);

    let splitadd = []; // Used for splitting the date (Added on)
    const pdata = json; // Returned SQL results
    // Cycle trough the whole data and add the results to corresponding slots
    for (let i=0;pdata.length>i;i++) {
      qDesc.push(pdata[i].Description);
      qImg.push(pdata[i].Thumb);
      qCond.push(pdata[i].pCondition);
      qPrice.push(pdata[i].Price);
      qBrand.push(pdata[i].pBrand);
      qName.push(pdata[i].pName);
      splitadd = [];
      splitadd = pdata[i].ProductAdded.match(/.{10}/g); // A very sophisticated way to display just the date
      qAdded.push(splitadd[0]);
      qEmail.push(pdata[i].Email)
    }
    console.log('qDesc ' + qDesc);

    //Create HTML elements and throw in the data previously generated
    for (let i=0;qDesc.length>i;i++) {
      qNameEle[i] = document.createElement('h1');
      qNameEle[i].innerText = qName[i];
      qImgEle[i] = document.createElement('img');
      qImgEle[i].setAttribute('src',qImg[i]);
      qDescEle[i] = document.createElement('p');
      qDescEle[i].innerText = qDesc[i];
      qCondEle[i] = document.createElement('h3');
      qCondEle[i].innerText = 'Condition: '+ condnames[qCond[i]];
      qPriceEle[i] = document.createElement('p');
      qPriceEle[i].innerText = qPrice[i] + ' €';
      qBrandEle[i] = document.createElement('h2');
      qBrandEle[i].innerText = qBrand[i];
      qAddedEle[i] = document.createElement('p');
      qAddedEle[i].innerText = 'Added on: ' + qAdded[i];
      qEmailEle[i] = document.createElement('p');
      qEmailEle[i].innerText = 'Contact seller: ' + qEmail[i]
    }

    //Create divs with all the previous elements. One cycle at a time.
    for (let i=0;qDescEle.length>i;i++) {
      const pid = document.createElement('div');
      pid.setAttribute('id','productdiv' + i);
      pid.setAttribute('class','productdiv');

      pid.appendChild(qNameEle[i]);
      pid.appendChild(qImgEle[i]);
      pid.appendChild(qDescEle[i]);
      pid.appendChild(qCondEle[i]);
      pid.appendChild(qPriceEle[i]);
      pid.appendChild(qBrandEle[i]);
      pid.appendChild(qAddedEle[i]);
      pid.appendChild(qEmailEle[i]);
      pid.style.border = '2px solid black';
      dv.appendChild(pid); // Display the product on the frontpage
    };
  });
};
// Toogle filter display
const showBrand = (evt) => {
  if (brandoptions.length == 0) {
    console.log(brandlist.length);
    for (let i=0;i < brandlist.length;i++) {
      brandoptions[i] = document.createElement('option');
      brandoptions[i].innerText = brandlist[i];
      brandoptions[i].value = brandlist[i];
    }
    if (selectBrand.childElementCount === 0) {
      for (let i = 0; i < brandoptions.length; i++) {
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
// Toogle filter display

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
  }
};
// Toogle filter display

const showCond = (evt) => {
  if (condoptions.length == 0) {
    console.log(condlist.length);
    for (let i=0;i < condlist.length;i++) {
      condoptions[i] = document.createElement('option');
      condoptions[i].innerText = condnames[i];
      condoptions[i].value = condlist[i];
    }
    if (selectCond.childElementCount === 0) {
      for (let i = 0; i < condoptions.length; i++) {
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
// Toogle filter display

const showType = (evt) => {
  if (typeoptions.length == 0) {
    console.log(typelist.length);
    for (let i=0;i < typelist.length;i++) {
      typeoptions[i] = document.createElement('option');
      typeoptions[i].innerText = typelist[i];
      typeoptions[i].value = typelist[i];
    }
    if (selectType.childElementCount === 0) {
      for (let i = 0; i < typeoptions.length; i++) {
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


// Event listeners for filters and product displays
form.addEventListener('submit', getprd); // Apply filters
brandButton.addEventListener('click', showBrand);
priceButton.addEventListener('click', showPrice);
condButton.addEventListener('click', showCond);
typeButton.addEventListener('click', showType);
window.addEventListener('load', getprd); // Show all products by default

