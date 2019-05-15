'use strict';

let uData;
let product;

const changeLayout = (uData) =>{
    let logReg = document.querySelector('.logReg');
    let loggedIn = document.querySelector('.loggedIn');
    let logRegMenu = document.querySelector('.logReg-form');
    loggedIn.innerHTML = "Logged in: "+uData.UserName;
    loggedIn.style.display = "block";
    logReg.style.display = "none";
    console.log("display");
    logRegMenu.style.display = "none";
    showUserInfo(uData);
};

let registerForm = document.querySelector('#register');
// insert a form
const register = (evt) => {
    // - prevents the form from sending
    evt.preventDefault();
// - makes FormData -object and adds the file selected byt the user into the object
    const data = new URLSearchParams();
    for (const pair of new FormData(registerForm)) {
        data.append(pair[0], pair[1]);
    }
    console.log(data);
// - send the file to the same url as in task a by using fetch -method
    const options = {
        method: 'post',
        body: data,
    };
    fetch('register',options)
        .then(response =>{
            return response.json();
        })
        .then(json => {
            console.log(json);
            registerForm.reset();
            window.alert('Thanks for registering to ManSecondHand!')
        });
};
registerForm.addEventListener('submit', register);

const loginForm = document.querySelector('#login');
// insert a form
const login = (evt) => {
    // - prevents the form from sending
    evt.preventDefault();
    //creating URL search params object for sending data that is not multiform.
    const data = new URLSearchParams();
    //appending formfields to the urlsearchparams
    for (const pair of new FormData(loginForm)) {
        data.append(pair[0], pair[1]);
    }
    console.log(data);
    const options = {
        method: 'post',
        body: data,
        };
    fetch('login', options).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        console.log("login fetch");
        uData = json;
        console.log(uData);
        getSession();
        window.alert("Welcome "+uData.UserName);
        console.log("login end")

    });
};
loginForm.addEventListener('submit', login);

// Function used for getting the user Session data
const getSession = () => {
    fetch('getsession', {
        credentials: 'include'
    }).then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
        uData = json;
        console.log(uData.UserName);
        //showHide(json);
        changeLayout(uData);
        window.alert('Successfully logged in');
    });
};
const productForm = document.querySelector('#productAdd');
// insert a form
const productAdd = (evt) => {
    // - prevents the form from sending
    evt.preventDefault();
    console.log(uData.uID);
// - makes FormData -object and adds the file selected byt the user into the object
    const data = new URLSearchParams();
    for (const pair of new FormData(productForm)) {
        data.append(pair[0], pair[1]);
    }
    data.append('id' , uData.uID);
    console.log(data);
// - send the file to the same url as in task a by using fetch -method
    const options = {
        method: 'post',
        body: data,
    };

    fetch('product', options)
        .then(response =>{
            return response.json();
        })
        .then(json => {
            console.log(json);
            product = json;
            imageAdd(product)

        });
};
productForm.addEventListener('submit', productAdd);

const imageForm = document.querySelector('#imageAdd');
const image = document.getElementById('imgA');
// make function 'upload' which
const imageAdd = (product) => {
    // - prevents the form from sending
  //  evt.preventDefault();
    console.log(product);
    console.log(product[0].pID);
// - makes FormData -object and adds the file selected byt the user into the object
    const imgForm = new FormData(imageForm);
    imgForm.append('id',product[0].pID);
// - send the file to the same url as in task a by using fetch -method
    const options = {
        method: 'post',
        body: imgForm,
    };

    fetch('image',options)
        .then(response =>{
            return response.json();
        })
        .then(json => {
            console.log(json);
            message.innerHTML = json.message;
            image.src = './uploads' + json.file.filename;
            window.alert("Thanks for adding a product for sale!");
            productForm.reset();
            imageForm.reset();
        });
};
const search = document.querySelector('.items-menu');
const floatb = document.querySelector('.floatb');
const exitb = document.querySelector('.exitb');



const toggleProduct = (evt) => {
    //alert('TOIMII');
    evt.preventDefault();
    if (floatb.style.display != 'none') {
        floatb.style.display = 'none';
        search.style.display = 'flex'
    }
    else {
        floatb.style.display = null;
        search.style.display = null
    }

};



floatb.addEventListener('click', toggleProduct);
exitb.addEventListener('click', toggleProduct);


function validation() {
    const namef = document.getElementById('name').value;
    const brandf = document.getElementById('brand').value;
    const descf = document.getElementById('description').value;
    const ptypef = document.getElementById('ptype').value;
    const pricef = document.getElementById('price').value;

    if (namef === '' || brandf === '' || descf === '' || ptypef === '' || pricef === '') {
        document.getElementById("details").innerHTML = "Please fill all required fields";
        return false;
    } else {
        return true;
    }
}
const showUserInfo = (uData) =>{
    let userPage = document.querySelector('.userPage');
    let userName = document.createElement('div');
    let email = document.createElement('div');
    let phone = document.createElement('div');
    let location = document.createElement('div');
    let accountCreated = document.createElement('div');
    userName.innerHTML = 'Your Username: '+uData.UserName;
    email.innerHTML = 'Email Address: '+uData.Email;
    phone.innerHTML = 'Phone number: '+uData.Phone;
    location.innerHTML = 'Location: '+uData.Location
    accountCreated.innerHTML = 'Account Created: '+uData.AccCreated;
    userPage.appendChild(userName);
    userPage.appendChild(email);
    userPage.appendChild(phone);
    userPage.appendChild(location);
    userPage.appendChild(accountCreated);
};
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
// imageForm.addEventListener('submit', imageAdd);



const mainApp = () => {
    getSession();
};
mainApp();



