const taxes = document.querySelector('#taxes');
const productsPrice = document.querySelectorAll('#product-price');
const totalPrice = document.querySelector('#total-price');
const shipping = document.querySelector('#shipping');
const discount = document.querySelector('#discount');
const counters = document.querySelectorAll('#counter');
const removeCartItems = document.querySelectorAll('#remove-cart-item');
const countTax = document.querySelector('#count-tax');

const alert = document.querySelector('#alert-event');

function showSuccessAlert() {
  alert.style.display = "block";
  alert.children[0].innerText = "The product has been added to the cart";
  alert.children[1].style.display = "block";
  setTimeout(() => alert.style.display = "none", 5000)
}

function showErrorAlert() {
  alert.style.display = "block";
  alert.children[0].innerText = "Max quality is 5";
  alert.children[1].style.display = "none";
  setTimeout(() => alert.style.display = "none", 3000)
}

counters.forEach((counter) => {
  counter.addEventListener('change', (e) => {
    const item = {
      pid: counter.dataset.pid,
      quantity: +e.target.value
    }

    fetch('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((res) => res.json())
      .then((data) => {
        productsPrice.forEach((productPrice) => {
          if (productPrice.dataset.pid === data.product.id) {
            productPrice.innerText = `$${data.product.price}`;
            shipping.innerText = `Shipping: $${data.shipping}`;
            discount.innerText = `Discount: ${data.discount}%`;
            totalPrice.innerText = `Total: $${data.totalPrice}`;
          }
        })
      })
      .catch(() => {
        showErrorAlert()
      })
  })
})

removeCartItems.forEach((removeCartItem) => {
  removeCartItem.addEventListener('click', () => {
    const pid = removeCartItem.dataset.pid;

    fetch(`/cart?pid=${pid}`, {
      method: "DELETE"
    }).then(() => window.location.href = '/cart')
  })
});

countTax.addEventListener('click', () => {
  let data = {
    amount: +countTax.dataset.amount
  }

  fetch('cart/taxes', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((data) => {
      taxes.innerText = `Tax: $${data.tax}`
    })
})