'use strict'

;
(function () {

    var Cart = function () {

        var products = [];

        this.getProduct = function (index) {
            return products[index].obj;
        };

        this.addProduct = function (product, count) {
            if (!validateProduct(product)) {
                console.error('Wrong product');
            }

            count = count || 1;

            var item = getProductByName(product.name);

            if (item) {
                item.count += count;
                var lsCount = +localStorage.getItem('productCount: ' + product.name);
                localStorage.setItem('productCount: ' + product.name, lsCount + count);
            } else {
                products.push({obj: product, count: count});
                localStorage.setItem('productCount: ' + product.name, count);
            }


            //перепишите функцию добавления товаров в корзину так, чтобы после добавления товара происходило сохранение всего массива товаров в Local Storage в переменную cart.
            localStorage.setItem('cart', JSON.stringify(products));

        };

        this.getProductPrice = function (productName) {
            var item = getProductByName(productName);
            var discount = getDiscount(item) / item.count;
            return item.obj.price - discount;
        };

        this.getProductSum = function (productName) {
            if (productName) {
                var item = getProductByName(productName);
                return this.getProductPrice(productName) * item.count;
            } else {
                var fillSum = 0;
                for (var i = 0; i < products.length; i++) {
                    fillSum += this.getProductPrice(products[i].obj.name) * products[i].count;
                }

                return fillSum;
            }
        };

        function getProductByName(productName) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].obj.name == productName) {
                    return products[i];
                }
            }
        };

        function validateProduct(product) {
            return product.name != undefined && product.price != undefined;
        };

        this.getProductDiscount = function (productName) {
            if (productName) {
                var item = getProductByName(productName);
                return getDiscount(item);
            } else {
                var fullDiscount = 0;
                for (var i = 0; i < products.length; i++) {
                    fullDiscount += getDiscount(products[i]);
                }

                return fullDiscount;
            }
        };


        function getDiscount(item) {
            var count = item.count;
            if (count > 5) {
                return item.obj.price * 0.1 * count;
            } else if (count > 3) {
                return item.obj.price * 0.05 * count;
            } else {
                return 0;
            }
        };


        //напишите самовызывающийся метод корзины который проверял бы есть ли сохраненные товары в Local Storage. Если есть то нужно заполнить массив продуктов экземплярами класса Product с количеством. Парсинг строки из Local Storage должен быть в конструкции try cache

        (function createCartDaraFromLocalStorage(tmpCart) {
            try {
                var itemsFromLocalStorage = localStorage.getItem('cart');
                var items = JSON.parse(itemsFromLocalStorage);
                if(items != null){
                    for (var i = 0; i < items.length; i++) {
                        tmpCart.addProduct(Product.createFromData({
                            'name': items[i].obj.name,
                            'price': items[i].obj.price,
                            'img': items[i].obj.img
                        }), items[i].count);
                    }
                }else return;

            } catch (error) {
                console.log(error)
            }
        })(this);

        this.getTotalPrice = function () {

            var totalSum = 0;

            for (var i = 0; i < products.length; i++) {
                totalSum += Number(products[i].obj.price) * products[i].count;
                totalSum -= Number(this.getProductDiscount(products[i].obj.name));
            }

            return totalSum;
        };

        this.getTotalItemsCount = function () {

            var totalCount = 0;

            for (var i = 0; i < products.length; i++) {
                totalCount += Number(products[i].count);
            }

            return totalCount;
        };

    }

    function Product() {

        this.createTable = function () {
            var table = document.createElement('table');

            for(var name in this){
                if(this[name] instanceof Function){
                    continue;
                }

                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.setAttribute('class', 'cart_product');
                var a = document.createElement('a');
                a.setAttribute('href', '');
                var img = document.createElement('img');
                img.setAttribute('src',"images/cart/one.png");
                img.setAttribute('alt',"");
                a.appendChild(img);
                td.appendChild(a);
                tr.appendChild(td);

                var td = document.createElement('td');
                td.setAttribute('class', 'cart_description');
                var h4 = document.createElement('h4');
                var a = document.createElement('a');
                a.setAttribute('href', '');
                a.innerHTML = this[name];
                h4.appendChild(a);
                td.appendChild(h4);
                tr.appendChild(td);

                var td = document.createElement('td');
                td.setAttribute('class', 'cart_price');
                var p = document.createElement('p');
                p.innerHTML = '$' + "50";
                td.appendChild(p);
                tr.appendChild(td);

                var td = document.createElement('td');
                td.setAttribute('class', 'cart_quantity');
                var div = document.createElement('div');
                div.setAttribute('class', 'cart_quantity_button');
                var a = document.createElement('a');
                a.setAttribute('class', 'cart_quantity_up');
                a.setAttribute('href', '');
                a.innerHTML = "+";
                var input = document.createElement('input');
                input.setAttribute('class', 'cart_quantity_input');
                input.setAttribute('type', 'text');
                input.setAttribute('name', 'quantity');
                input.setAttribute('value', '1');
                input.setAttribute('autocomplete', 'off');
                input.setAttribute('size', '2');
                var a2 = document.createElement('a');
                a2.setAttribute('class', 'cart_quantity_down');
                a2.setAttribute('href', '');
                a2.innerHTML = "-";
                div.appendChild(a);
                div.appendChild(input);
                div.appendChild(a2);
                td.appendChild(div);
                tr.appendChild(td);

                var td = document.createElement('td');
                td.setAttribute('class', 'cart_total');
                var p = document.createElement('p');
                p.setAttribute('class', 'cart_total_price');
                p.innerHTML = '$' + "50";
                td.appendChild(p);
                tr.appendChild(td);

                var td = document.createElement('td');
                td.setAttribute('class', 'cart_delete');
                var a = document.createElement('a');
                a.setAttribute('class', 'cart_quantity_delete');
                a.setAttribute('href', '');
                var i = document.createElement('i');
                i.setAttribute('class', 'fa fa-times');
                a.appendChild(i);
                td.appendChild(a);
                tr.appendChild(td);

                // p.innerHTML = '$' + this[price];
                // td.appendChild(p);
                // tr.appendChild(td);
                //
                //
                // p.innerHTML = '$' + this[price];
                // td.appendChild(p);
                // tr.appendChild(td);
                //
                // td = document.createElement('td');
                // td.innerHTML = this[name];
                // tr.appendChild(td);

                table.appendChild(tr)




                // <td class="cart_product">
                //     <a href=""><img src="images/cart/one.png" alt=""></a>
                //     </td>
                //     <td class="cart_description">
                //     <h4><a href="">Colorblock Scuba</a></h4>
                // <p>Web ID: 1089772</p>
                // </td>
                // <td class="cart_price">
                //     <p>$59</p>
                //     </td>
                //     <td class="cart_quantity">
                //     <div class="cart_quantity_button">
                //     <a class="cart_quantity_up" href=""> + </a>
                //     <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
                //     <a class="cart_quantity_down" href=""> - </a>
                //     </div>
                //     </td>
                //     <td class="cart_total">
                //     <p class="cart_total_price">$59</p>
                //     </td>
                //     <td class="cart_delete">
                //     <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                //     </td>
            }

            return table;

        };

    }

    Product.createEmpty = function () {
        var product = new Product;
        product.price = 100;
        product.name = 'Empty';
        return product;
    };

    Product.createFromData = function (data) {
        var product = new Product;
        product.price = data.price;
        product.name = data.name;
        product.img = data.img;
        return product;
    };


    window.Cart = Cart;
    window.Product = Product;

})();

// function Product(){
//
// }
//
// Product.createEmpty = function(){
//     var product = new Product;
//     product.price = 100;
//     product.name = 'Empty';
//     return product;
// };
//
// Product.createFromData = function(data){
//     var product = new Product;
//     product.price = data.price;
//     product.name = data.name;
//     return product;
// };
//
//
// var cart = new Cart;
// //тестируем загрузку из local storage
// //console.log(cart.getProduct(0));
// //console.log(cart.getProductDiscount("Empty"));
// //console.log(cart.getProductDiscount("toster"));
// // console.log(cart.getProductDiscount());
//
// //наполение корзины данными и вызов основных функций
// cart.addProduct(Product.createEmpty());
// cart.addProduct(Product.createFromData({name: 'tv', price: 100}));
// cart.addProduct(Product.createFromData({name: 'tv', price: 100}));
// cart.addProduct(Product.createFromData({name: 'tv', price: 100}));
// cart.addProduct(Product.createFromData({name: 'tv', price: 100}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'mp3 player', price: 300}));
// cart.addProduct(Product.createFromData({name: 'toster', price: 300}), 5);
//
// console.log(cart.getProduct(0));
// console.log(cart.getProductDiscount("Empty"));
// console.log(cart.getProductDiscount("tv"));
// console.log(cart.getProductDiscount("mp3 player"));
// console.log(cart.getProductDiscount());
// console.log(cart.getProductDiscount("toster"));