'use strict'

$(document).ready(function() {

    var cart = new Cart;

    var count = cart.getElementsCount();

    var tableBody = $('.table-condensed tbody');

    for(var i = 0; i < count; i++){
        var product = cart.getProduct(i);
        var sum = cart.getProductSum(product.name);
        product.setTotalSum(sum);
        var itemsCount = cart.getElementCount(product.name)
        product.setProductCount(itemsCount);
        var tr = product.createTable();
        tableBody.append(tr);
    }

});

$(document).on('click', '.cart_quantity_down', function (event) {
    var cart = new Cart;
    var itemName = $($($(this).parents('tr')).find('.cart_description')).find('a').text();
    cart.removeProduct(itemName);
});

$(document).on('click', '.cart_quantity_up', function (event) {
    var cart = new Cart;
    var itemName = $($($(this).parents('tr')).find('.cart_description')).find('a').text();
    var itemPrice = $($($(this).parents('tr')).find('.cart_price')).find('p').text().slice(1);

    var item = Product.createFromData({name: itemName, price: itemPrice});
    cart.addProduct(item);
});

$(document).on('click', '.cart_quantity_delete', function (event) {
    var cart = new Cart;
    var itemName = $($($(this).parents('tr')).find('.cart_description')).find('a').text();
    cart.destroyProduct(itemName);
});