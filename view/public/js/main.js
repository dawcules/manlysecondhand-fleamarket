'use strict';

let uData = null;
const logReg = document.querySelector('.logReg')
const loggedIn = document.querySelector('.loggedIn')
const registerForm = document.querySelector('#register');
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
            window.alert('Thanks for registering to ManSecondHand!')
        });
};
productForm.addEventListener('submit', register);

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
        getSession();
        console.log(udata);
        window.alert("Welcome "+udata.username);
        // showHide(json);
    });
};
productForm.addEventListener('submit', login);

// Function used for getting the user Session data
const getSession = () => {
    fetch('getsession', {
        credentials: 'include'
    }).then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
        udata = json;
        console.log(udata.UserName);
        //showHide(json);
        window.alert('Successfully logged in');
    });
};
const changeLayout = () =>{
    if(udata != null) {
        loggedIn.innerHTML = udata.username;
        loggedIn.classList.toggle('loggedIn-display');
        logReg.classList.toggle('logReg-display');
    }else{
        console.log("nothing to do");
    }
};

const app = () => {
    getSession();
    changeLayout();
};
app();





