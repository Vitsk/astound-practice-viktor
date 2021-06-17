const removeCartItems = document.querySelectorAll('#remove-cart-item');
const countTax = document.querySelector('#count-tax');
const taxes = document.querySelector('#taxes');

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