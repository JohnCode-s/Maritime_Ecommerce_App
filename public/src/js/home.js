const checkoutBtn = document.getElementById('checkout');
const products = [];
checkoutBtn.addEventListener('click', () => {
  if (products.length > 0) {
    //fetch post request
    fetch('/api/order/save-order', {
      method: 'POST',
      body: JSON.stringify({
        products: products,
      }),

      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        window.location.href = '/src/html/invoice.html';
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert('Cart is empty.');
  }
});

(function () {
  const caret = document.querySelector('.caret');
  const logout = document.querySelector('.logout');
  // console.log(document.cookie);

  caret.addEventListener('click', () => {
    logout.classList.toggle('logout-active');
  });
})();

(function () {
  const cartBtn = document.querySelector('.cart-box');
  const cart = document.querySelector('.cart');

  cartBtn.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  });
})();

(function () {
  const cartBtn = document.querySelectorAll('.add');
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      //console.log(event.target);
      if (event.target.parentElement.classList.contains('desc')) {
        const item = [];
        let name = event.target.parentElement.children[0].textContent;
        let priceWsign = event.target.parentElement.children[1].textContent;

        let price = priceWsign.substring(1);
        item.name = name;
        item.price = price;
        quantity = 1;
        products.push({ name, price, quantity });
        //console.log(products);

        let id = Math.floor(Math.random());

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<h1 id="cart-item-title">${item.name}</h1>
        <i class=" minus fas fa-minus"></i>
        <span class="quantity">1</span>
        <i class=" plus fas fa-plus"></i>

<span>$</span>
<span id="cart-item-price" class="cart-item-price">${item.price}</span>

</div>`;

        //select cart
        const cart = document.querySelector('.cart');
        const buttons = document.querySelector('.cart-buttons-container');

        cart.insertBefore(cartItem, buttons);

        increment(cartItem, item.price);
        decrement(cartItem, item.price);
        updateTotalPrice(cartItem.children[5].textContent);

        //  console.log(cartItem);
        removeItems(cartItem);
      }
    });
  });
})();

function removeItems(items) {
  const removeBtn = document.getElementById('clear-cart');
  removeBtn.addEventListener('click', () => {
    items.classList.add('cart-item-remove');
  });
}

function increment(item, iniPrice) {
  const plus = item.children[3];
  plus.addEventListener('click', () => {
    let amount = item.children[2];
  
    let name = item.children[0].textContent;
    //console.log(name);
    let itemPrice = item.children[5];
    amount.textContent = parseInt(amount.textContent) + 1;
    itemPrice.textContent =
      parseFloat(iniPrice.replace(/,/g, '')) * amount.textContent;
    itemPrice.textContent = itemPrice.textContent
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //console.log(iniPrice);
    updateTotalPrice(itemPrice.textContent);
    products.forEach(prod => {
      if (prod.name == name) {
        console.log(prod);
        prod.price = itemPrice.textContent;
        prod.quantity = amount.textContent;
        console.log(prod);
      }
    });
  });
}

function decrement(item, iniPrice) {
  const minus = item.children[1];
  minus.addEventListener('click', () => {
    let amount = item.children[2];
    let name = item.children[0].textContent;
    //console.log(name);
    let itemPrice = item.children[5];
    if (amount.textContent > 1) {
      amount.textContent = parseInt(amount.textContent) - 1;
      itemPrice.textContent =
        parseFloat(iniPrice.replace(/,/g, '')) * amount.textContent;
      itemPrice.textContent = itemPrice.textContent
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //console.log(iniPrice);
      updateTotalPrice(itemPrice.textContent);
       products.forEach(prod => {
      if (prod.name == name) {
        console.log(prod);
        prod.price = itemPrice.textContent;
        prod.quantity = amount.textContent;
        console.log(prod);
      }
    });
    }
  });
}

function updateTotalPrice(items_price) {
  //console.log(items_price);
}
