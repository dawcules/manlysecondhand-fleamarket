const LoginRegister = () =>{
    const logReg = document.querySelector('.logReg');
    const form = document.querySelector('.logReg-form');
    logReg.addEventListener('click', () =>{
        form.classList.toggle('logReg-form-active');
    });
};
const closeLogReg = () =>{
    const closeLog = document.querySelector('.closeLog');
    const closeReg = document.querySelector('.closeReg');
    const logRegForm = document.querySelector('.logReg-form');
    closeLog.addEventListener('click', () => {
        logRegForm.classList.toggle('logReg-form-active');
    });
    closeReg.addEventListener('click', () => {
        logRegForm.classList.toggle('logReg-form-active');
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
const closeUser = () =>{
    const userMenu = document.querySelector('.userMenu');
    const closeUser = document.querySelector('.closeUser');
    closeUser.addEventListener('click', () =>{
        userMenu.classList.toggle('userMenu-active');
    });
};
const closeProduct = () =>{
    const productForm = document.querySelector('.productForm');
    const closeProduct= document.querySelector('.closeProduct');
    closeProduct.addEventListener('click', () =>{
        productForm.classList.toggle('productForm-active');
    });
};
const closeUP = () =>{
    const userPage = document.querySelector('.userPage');
    const closeUP= document.querySelector('.closeUP');
    closeUP.addEventListener('click', () =>{
        userPage.classList.toggle('userPage-active');
    });
};


const app = () =>{
    LoginRegister();
    userMenu();
    userPage();
    addProduct();
    closeLogReg();
    closeUser();
    closeProduct();
    closeUP();
};

app();
