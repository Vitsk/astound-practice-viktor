const CartFactory = require('~/scripts/factories/cart');
const cartHelper = {};

cartHelper.getCartData = function () {
  return CartFactory.getCartData();
};

cartHelper.setCartData = function (data) {
  return CartFactory.setCartData({
    data: data,
  });
};

module.exports = cartHelper;
