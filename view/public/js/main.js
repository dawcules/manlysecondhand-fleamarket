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
    if(logRegMenu.style.transform !== 'translateX(0%)') {
        logRegMenu.classList.toggle('logReg-form-active');
        console.log("logreg changed");
    }else{
        console.log("no changes");
    }
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
// - makes FormData -object and adds the file selected byt the user into the object
    const data = new URLSearchParams();
    for (const pair of new FormData(loginForm)) {
        data.append(pair[0], pair[1]);
    }
    console.log(data);
// - send the file to the same url as in task a by using fetch -method
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
// - makes FormData -object and adds the file selected byt the user into the object
    const imgForm = new FormData(imageForm);
    imgForm.append('id',product.pID);
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
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
// imageForm.addEventListener('submit', imageAdd);


//WIP
const userinformation = (user) => {};


const mainApp = () => {
    getSession();
};
mainApp();



