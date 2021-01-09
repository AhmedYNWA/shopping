if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

    function addCart(product_id) {

        for (var i = 0; i < products.length; i++) {
            if (products[i].product_id == product_id) {
                var cartItem = null;
                for (var k = 0; k < cart.length; k++) {
                    if (cart[k].product.product_id == products[i].product_id) {
                        cartItem = cart[k];
                        cart[k].product_qty++;
                        break;
                    }
                }
                if (cartItem == null) {
                    
                    var cartItem = {
                        product: products[i],
                        product_qty: products[i].product_qty 
                    };
                    cart.push(cartItem);
                }
            }
        }

        renderCartTable();

    }

    function renderCartTable() {
    var html = '';
    var ele = document.getElementById("demo2");
    ele.innerHTML = ''; 

    html += "<table id='tblCart' border='1|1'>";
    html += "<tr><td>Product ID</td>";
    html += "<td>Product Description</td>";
    html += "<td>Quantity</td>";
    html += "<td>Price</td>";
    html += "<td>Total</td>";
    html += "<td>Action</td></tr>";
    var GrandTotal = 0;
    for (var i = 0; i < cart.length; i++) {
        html += "<tr>";
        html += "<td>" + cart[i].product.product_id + "</td>";
        html += "<td>" + cart[i].product.product_desc + "</td>";
        html += "<td>" + cart[i].product_qty + "</td>";
        html += "<td>" + cart[i].product.product_price + "</td>";
        html += "<td>" + parseFloat(cart[i].product.product_price) * parseInt(cart[i].product_qty) + "</td>";
        html += "<td><button type='submit' onClick='subtractQuantity(\"" + cart[i].product.product_id + "\", this);'/>Subtract Quantity</button> &nbsp<button type='submit' onClick='addQuantity(\"" + cart[i].product.product_id + "\", this);'/>Add Quantity</button> &nbsp<button type='submit' onClick='removeItem(\"" + cart[i].product.product_id + "\", this);'/>Remove Item</button></td>";
        html += "</tr>";

       GrandTotal += parseFloat(cart[i].product.product_price) * parseInt(cart[i].product_qty);            

    }
    document.getElementById('demo3').innerHTML = GrandTotal;
    html += "</table>";
    ele.innerHTML = html;
}


    function subtractQuantity(product_id)
    {
        
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.product_id == product_id) {
                cart[i].product_qty--;
            }

            if (cart[i].product_qty == 0) {
                cart.splice(i,1);
            }
    
        }
        renderCartTable();
    }
    function addQuantity(product_id)
    {
        
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.product_id == product_id) {
                cart[i].product_qty++;
            }  
        }
        renderCartTable();
    }
    function removeItem(product_id)
    {
        
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.product_id == product_id) {
                cart.splice(i,1);
            }

        }
        renderCartTable();
    }