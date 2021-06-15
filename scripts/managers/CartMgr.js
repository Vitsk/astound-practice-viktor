const cart = require('~/db/cart.json');
const CartMgr = {};


CartMgr.getCartData = function () {
  return cart[0];
};

CartMgr.setCartData = function (cartData) {
  cart[0] = cartData;
  return JSON.stringify("Successful");
};

module.exports = CartMgr;
