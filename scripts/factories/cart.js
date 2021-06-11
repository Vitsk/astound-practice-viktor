const CartMgr = require('~/scripts/managers/CartMgr');

module.exports = {
  getCartData: function () {
    return CartMgr.getCartData();
  },

  setCartData: function (params) {
    return CartMgr.setCartData(params.data);
  }
}
