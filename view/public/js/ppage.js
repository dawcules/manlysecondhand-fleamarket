'use strict';
const form = document.querySelector('form');
const brandButton = document.querySelector('#pbrand');
const priceButton = document.querySelector('#pprice');
const condButton = document.querySelector('#pcond');
const typeButton = document.querySelector('#ptype');
const brandlist = ['Nike','Adidas','Reebok'];
const brandoptions = [];

const select = document.createElement('select');


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
    for (let i=0;i < brandoptions.length;i++) {
      console.log('listan 2 ' + i);
      select.appendChild(brandoptions[i])
    }
    select.setAttribute('id','brandname');
    form.appendChild(select)
  }
  if (select.style.display == '') {
    select.style.display = 'inline'
  }
  else { select.style.display = "none"}
};

const showPrice = (evt) => {
  alert('Tässä hinta')
};

const showCond = (evt) => {
  alert('Tässä kunto')
};

const showType = (evt) => {
  alert('Tässä tyyppi')
};

/*<button type="submit" id="pbrand">Brand</button>
      <button type="submit" id="pprice">Price</button>
      <button type="submit" id="pcond">Condition</button>
      <button type="submit" id="ptype">Type</button>*/


form.addEventListener('submit', getprd);
brandButton.addEventListener('click', showBrand);
priceButton.addEventListener('click', showPrice);
condButton.addEventListener('click', showCond);
typeButton.addEventListener('click', showType);

