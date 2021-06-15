const CartMgr = require('~/scripts/managers/CartMgr');

function _isItemUnique(items, pid) {
  let unique = true;
  for (let i = 0; i < items.length; i++) {
    if (items[i].pid === pid) {
      unique = false;
      break;
    }
  }
  return unique;
}

module.exports = {
  getCartData: function () {
    return CartMgr.getCartData();
  },

  setCartData: function (params) {
    const cartItem = params.cartItem;
    const cartData = CartMgr.getCartData();
    
    if (cartData.items.length === 0 || _isItemUnique(cartData.items, cartItem.pid)) {
      cartData.items.push(cartItem);
    } else {
      cartData.items.forEach(function (item) {
        if (item.pid === cartItem.pid) {
          item.quantity += cartItem.quantity;
          item.price = cartItem.price * item.quantity;
        }
      });
    }

    cartData.totalPrice += cartItem.price;

    return CartMgr.setCartData(cartData);
  }
}
