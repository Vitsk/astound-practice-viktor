const cart = require('~/db/cart.json');
const CartMgr = {};


CartMgr.getCartData = function () {
  return cart[0];
};

CartMgr.setCartData = function (cartItem) {
  cart[0].items.push(cartItem.item);
  cart[0].totalPrice += cartItem.totalPrice;
  return JSON.stringify("Successful");
};

module.exports = CartMgr;
