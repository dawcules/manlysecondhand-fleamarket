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


const app = () =>{
    LoginRegister();
    itemsMenu();
};

app();