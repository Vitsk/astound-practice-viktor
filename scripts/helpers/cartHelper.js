// const CartFactory = require('~/scripts/factories/cart');
const ProductMgr = require('~/scripts/managers/ProductMgr')
const cartHelper = {};
let cartData = [];

function _isItemUnique(pid) {
  let unique = true;
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].pid === pid) {
      unique = false;
      break;
    }
  }
  return unique;
}

cartHelper.getCartData = function (cookieItem) {
  cartData = cookieItem;

  let products = {
    items: [],
    totalPrice: 0
  };

  cartData.map(function(item) {
    let productItem = ProductMgr.getProductVariation(item.pid)[0];
    
    productItem.quantity = item.quantity;
    // productItem.price *= item.quantity;

    products.items.push(productItem);
  })

  products.items.forEach(function(item) {
    products.totalPrice += item.price * item.quantity
  })

  return products;
};

cartHelper.setCartData = function (cartItem) {
  if (cartData.length === 0 || _isItemUnique(cartItem.pid)) {
    cartData.push(cartItem);
  } else {
    cartData.forEach(function (item) {
      if (item.pid === cartItem.pid) {
        item.quantity += cartItem.quantity;
      }
    });
  }

  return cartData;
};

cartHelper.deleteCartData = function (pid) {
  cartData.forEach(function(item, index) {
    if (item.pid === pid) {
      cartData.splice(index, 1);
    }
  })

  return cartData;
}

module.exports = cartHelper;
