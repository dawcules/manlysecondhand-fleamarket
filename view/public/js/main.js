'use strict';

let uData;

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
    fetch('login', options, { redirect: "error" }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        console.log("login fetch");
        console.log(udata);
        window.alert("Welcome "+udata.username);
        changeLayout(json);
        console.log("login end")
    });
};
loginForm.addEventListener('submit', login);

// Function used for getting the user Session data
/*
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
        changeLayout();
        window.alert('Successfully logged in');
    });
};
*/

const changeLayout = (user) =>{
        let logReg = document.querySelector('.logReg');
        let loggedIn = document.querySelector('.loggedIn');
        loggedIn.innerHTML = user.username;
        loggedIn.style.display = "block";
        logReg.style.display = "none";
        console.log("display");
};


/*
const mainApp = () => {
    getSession();
    changeLayout();
};
mainApp();
*/




