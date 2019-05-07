const LoginRegister = () =>{
    const logReg = document.querySelector('.logReg');
    const form = document.querySelector('.logReg-form');
    logReg.addEventListener('click', () =>{
        form.classList.toggle('logReg-form-active');
    });
};
const itemsMenu = () =>{
    const items= document.querySelector('.items');
    const menu = document.querySelector('.items-menu');
    items.addEventListener('click', () =>{
        menu.classList.toggle('items-menu-active');
    });
};
const userMenu = () =>{
    const loggedIn = document.querySelector('.loggedIn');
    const userMenu = document.querySelector('.userMenu');
    loggedIn.addEventListener('click', () =>{
        userMenu.classList.toggle('userMenu-active');
    });
};

const app = () =>{
    LoginRegister();
    itemsMenu();
    userMenu();
};

app();