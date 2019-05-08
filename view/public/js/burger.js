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






// WIP
const userPage = () =>{
    const userPage = document.querySelector('.userPage');
    const userInfo = document.querySelector('.userInfo');
    userInfo.addEventListener('click', () =>{
        userPage.classList.toggle('userPage-active');
    });
};
const addProduct = () =>{
    const addProduct = document.querySelector('.addProduct');
    const productForm = document.querySelector('.productForm');
    addProduct.addEventListener('click', () =>{
        productForm.classList.toggle('productForm-active');
    });
};

const productPage = () =>{
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
    userPage();
    addProduct();
};

app();
