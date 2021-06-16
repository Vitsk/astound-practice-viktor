const CartFactory = require('~/scripts/factories/cart');
const cartHelper = {};

cartHelper.getCartData = function () {
  return CartFactory.getCartData();
};

cartHelper.setCartData = function (cartItem, cookieItems) {
  return CartFactory.setCartData({
    cartItem: cartItem,
  });
};

module.exports = cartHelper;
