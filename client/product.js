const selectVariation = document.querySelector('#select-variation');
const variationName = document.querySelector('#variation-name');
const variationImage = document.querySelector('#variation-image');
const variationDescription = document.querySelector('#variation-description');
const variationPrice = document.querySelector('#variation-price');
const inputQuantity = document.querySelector('#input-quantity');

const addCartProduct = document.querySelector('#add-cart-product');

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
  let cart = {
    item: {
      pid: selectVariation.value,
      name: variationName.dataset.name,
      variation: selectVariation.dataset.pid,
      image: variationImage.src,
      quantity: +inputQuantity.value,
      price: +variationPrice.dataset.price * +inputQuantity.value
    },
    totalPrice: +variationPrice.dataset.price * +inputQuantity.value
  }

  fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  });

  // res.then(res => res.json())
  //   .then(data => console.log(data));

  const res2 = fetch('/cart?data=true');
  res2.then(res => res.json())
    .then(data => console.log(data))
})