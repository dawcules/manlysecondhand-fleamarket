'use strict';
let udata = null;
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
let qEmail = [];
let qEmailEle = [];
const dv = document.getElementById('ppage');


fetch('getsession', {
  credentials: 'include'
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
  udata = json;
  console.log(udata.UserName);
  //showHide(json);
  const heyuser = document.createElement('p');
  const bod = document.querySelector('body');
  bod.appendChild(heyuser);
  getprod();
});

const getprod = () => {
fetch('getown', {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    uprod: udata.UserName
  })
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log('json' + json);
  const pdata = json;

  for (let i = 0; pdata.length > i; i++) {
    qDesc.push(pdata[i].Description);
    qImg.push(pdata[i].Thumb);
    qCond.push(pdata[i].pCondition);
    qPrice.push(pdata[i].Price);
    qBrand.push(pdata[i].pBrand);
    qName.push(pdata[i].pName);
    qAdded.push(pdata[i].ProductAdded);
    qEmail.push(pdata[i].Email)

  }

  for (let i = 0; qDesc.length > i; i++) {
    qNameEle[i] = document.createElement('h1');
    qNameEle[i].innerText = qName[i];
    qImgEle[i] = document.createElement('img');
    qImgEle[i].setAttribute('src', qImg[i]);
    qDescEle[i] = document.createElement('p');
    qDescEle[i].innerText = qDesc[i];
    qCondEle[i] = document.createElement('h3');
    qCondEle[i].innerText = 'Condition level: ' + qCond[i];
    qPriceEle[i] = document.createElement('p');
    qPriceEle[i].innerText = qPrice[i] + ' €';
    qBrandEle[i] = document.createElement('h2');
    qBrandEle[i].innerText = qBrand[i];
    qAddedEle[i] = document.createElement('p');
    qAddedEle[i].innerText = qAdded[i];
    qEmailEle[i] = document.createElement('p');
    qEmailEle[i].innerText = 'Contact seller: ' + qEmail[i]
  }

  for (let i = 0; qDescEle.length > i; i++) {
    const pid = document.createElement('div');
    pid.setAttribute('id', 'productdiv' + i);

    pid.appendChild(qNameEle[i]);
    pid.appendChild(qImgEle[i]);
    pid.appendChild(qDescEle[i]);
    pid.appendChild(qCondEle[i]);
    pid.appendChild(qPriceEle[i]);
    pid.appendChild(qBrandEle[i]);
    pid.appendChild(qAddedEle[i]);
    pid.appendChild(qAddedEle[i]);
    pid.style.border = '2px solid black';
    dv.appendChild(pid);
  }
});









};




