const selectVariations = document.querySelectorAll('#select-variation');
const variationImages = document.querySelectorAll('#variation-image');
const variationsPrice = document.querySelectorAll('#variation-price');
const inputsQuantity = document.querySelectorAll('#input-quantity');

const addToCartButtons = document.querySelectorAll('#add-cart-product');
const alert = document.querySelector('#alert-event');

selectVariations.forEach((selectVariation) => {
  selectVariation.addEventListener('change', (e) => {
    const masterId = selectVariation.dataset.id;
    const pid = e.target.value;

    fetch(`/product/${masterId}?variation=${pid}&data=${true}`)
      .then(res => res.json())
      .then(data => {
        variationImages.forEach((variationImage) => {
          if (variationImage.dataset.id === masterId) {
            variationImage.src = data.image;
          }
        });

        variationsPrice.forEach((variationPrice) => {
          if (variationPrice.dataset.id === masterId) {
            variationPrice.innerText = `Price: ${data.price}$`;
          }
        });
      })
  })
})

inputsQuantity.forEach((inputQuantity) => {
  inputQuantity.addEventListener('change', (e) => {
    variationsPrice.forEach((variationPrice) => {
      if (variationPrice.dataset.id === inputQuantity.dataset.id) {
        let price = variationPrice.dataset.price * e.target.value;

        variationPrice.innerText = `Price: ${price}$`;
      }
    })
  })
})

addToCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', (e) => {
    const masterId = addToCartButton.dataset.id;
    let cartItem = {
      pid: "",
      quantity: 0
    };

    selectVariations.forEach((selectVariation) => {
      if (selectVariation.dataset.id === masterId) {
        cartItem.pid = selectVariation.value
      }
    });

    inputsQuantity.forEach((inputQuantity) => {
      if (inputQuantity.dataset.id === masterId) {
        cartItem.quantity = +inputQuantity.value;
      }
    });

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
})