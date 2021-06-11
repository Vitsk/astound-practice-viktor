const cart = require('~/db/cart.json');
const CartMgr = {};

CartMgr.getCartData = function () {
  return cart;
};

CartMgr.setCartData = function (data) {
  cart[0].items.push(data.items);
  cart[0].price += data.price
  return JSON.stringify("Successful");
};

module.exports = CartMgr;
