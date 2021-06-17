const removeCartItems = document.querySelectorAll('#remove-cart-item');

removeCartItems.forEach((removeCartItem) => {
  removeCartItem.addEventListener('click', () => {
    const pid = removeCartItem.dataset.pid;
    
    fetch(`/cart?pid=${pid}`, {
      method: "DELETE"
    }).then(() => window.location.href = '/cart')
  })
});
