'use strict'

$(document).on('click', '.add-to-cart', function (event) {
     var cart = new Cart;

    var productName = $($($(this).parents('.single-products')).children('.productinfo')).find('p').text();
    var productPrice = $($($(this).parents('.single-products')).children('.productinfo')).find('h2').text().slice(1);
    var productImg = $($($(this).parents('.single-products')).children('.productinfo')).find('img').attr('src');

    var item = Product.createFromData({name: productName, price: productPrice, img: productImg});
    console.log(item.createTable());

    cart.addProduct(item);

    updateHeader(cart);
    
});

$(document).ready(function() {

    var div = document.createElement('div');
    div.setAttribute('class', 'cart-info');
    var ul = document.createElement('ul');
    ul.setAttribute('class', 'nav navbar-nav');
    div.appendChild(ul);

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = 'Items count:';
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    var i = document.createElement('i');
    i.setAttribute('id', 'items-count');
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = 'Total price:';
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    var i = document.createElement('i');
    i.setAttribute('id', 'total-price');
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);

    console.log(div);

    var header = $('.col-sm-8');
    header.append(div);

    var cart = new Cart;
    updateHeader(cart);

});

var updateHeader = function (cart) {
    var price = cart.getTotalPrice();
    if(price > 0){
        $('#total-price').text(price);
    }else{
        $('#total-price').text(0.0);
    }

    var count = cart.getTotalItemsCount();
    if(count > 0){
        $('#items-count').text(count);
    }else{
        $('#items-count').text(0);
    }
}

