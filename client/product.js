const selectVariation = document.querySelector('#select-variation');
const variationName = document.querySelector('#variation-name');
const variationImage = document.querySelector('#variation-image');
const variationDescription = document.querySelector('#variation-description');
const variationPrice = document.querySelector('#variation-price');

const addCartProduct = document.querySelector('#add-cart-product');

selectVariation.addEventListener('change', (e) => {
  const masterId = selectVariation.dataset.masterid;
  const pid = e.target.value;

  fetch(`/product/${masterId}?variation=${pid}&data=${true}`)
    .then(res => res.json())
    .then(data => {
      variationName.innerText = data.name;
      variationImage.src = data.image;
      variationDescription.innerHtml = data.longDescription;
      variationPrice.innerText = `Price: ${data.price}$`;
    })
})

// test event for adding products to cart
addCartProduct.addEventListener('click', (e) => {
  // test data
  let cart = {
    items: [
      { name: variationName.innerText }
    ],
    price: 50
  }

  const res = fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  });
  
  res.then(res => res.json())
    .then(data => console.log(data));

  const res2 = fetch('/cart');
  res2.then(res => res.json())
    .then(data => console.log(data))
})