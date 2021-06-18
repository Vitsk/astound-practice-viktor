const selectVariation = document.querySelector('#select-variation');
const variationName = document.querySelector('#variation-name');
const variationImage = document.querySelector('#variation-image');
const variationDescription = document.querySelector('#variation-description');
const variationPrice = document.querySelector('#variation-price');
const inputQuantity = document.querySelector('#input-quantity');

const addCartProduct = document.querySelector('#add-cart-product');
const alert = document.querySelector('#alert-event');

inputQuantity.addEventListener('change', (e) => {
  let price = variationPrice.dataset.price * e.target.value;

  variationPrice.innerText = `Price: ${price}$`
})

selectVariation.addEventListener('change', (e) => {
  const masterId = selectVariation.dataset.masterid;
  const pid = e.target.value;

  fetch(`/product/${masterId}?variation=${pid}&data=${true}`)
    .then(res => res.json())
    .then(data => {
      variationName.innerText = data.name;
      variationName.dataset.name = data.name;

      variationImage.src = data.image;
      variationDescription.innerHtml = data.longDescription;

      variationPrice.innerText = `Price: ${data.price}$`;
      variationPrice.dataset.price = data.price;
    })
})

addCartProduct.addEventListener('click', () => {
  let cartItem = {
    pid: selectVariation.value,
    quantity: +inputQuantity.value
  }

  fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItem)
  }).then((res) => res.json())
    .then(() => {
      alert.style.display = "block";
      alert.children[0].innerText = "The product has been added to the cart";
      alert.children[1].style.display = "block";
      setTimeout(() => alert.style.display = "none", 5000)
    })
    .catch(() => {
      alert.style.display = "block";
      alert.children[0].innerText = "Max quality is 5";
      alert.children[1].style.display = "none";
      setTimeout(() => alert.style.display = "none", 3000)
    })
})