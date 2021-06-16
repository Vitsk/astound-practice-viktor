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

function _addDiscount(item) {
  if (item.quantity >= 2) {
    let num = item.price * 0.9;
    item.price = Math.round(num * 100) / 100;
    item.discount = 10;
  }
}

function _totalPrice(cartData) {
  cartData.items.forEach(function(item) {
    cartData.totalPrice += item.price;
  })
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
          _addDiscount(item);
        }
      });
    }

    _totalPrice(cartData)

    return cartData;
  }
}
