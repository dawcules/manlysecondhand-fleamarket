'use strict';

// insert a form
const product= document.querySelector('#productform');

const sendProduct = (evt) => {
    evt.preventDefault();
    const fd = new FormData(product);
    const settings = {
        method: 'post',
        body: fd,
    };

    fetch('./product', settings).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        // update list
        getData();
        product.reset();
    });
};

product.addEventListener('submit', product);