'use strict'

$(document).on('click', '.add-to-cart', function (event) {
     var cart = new Cart;

    var productName = $($($(this).parents('.single-products')).children('.productinfo')).find('p').text();
    var productPrice = $($($(this).parents('.single-products')).children('.productinfo')).find('h2').text().slice(1);
    var productImg = $($($(this).parents('.single-products')).children('.productinfo')).find('img').attr('src');

    var item = Product.createFromData({name: productName, price: productPrice, img: productImg});
    console.log(item.createTable());

    cart.addProduct(item);

    // console.log($($($(this).parents('.single-products')).children('.productinfo')).find('h2').text());
    // console.log($($($(this).parents('.single-products')).children('.productinfo')).find('p').text());
    // console.log($($($(this).parents('.single-products')).children('.productinfo')).find('img').attr('src'));
})

$(document).ready(function() {

    var cart = new Cart;

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

});
