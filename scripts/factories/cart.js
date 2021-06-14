const CartMgr = require('~/scripts/managers/CartMgr');

module.exports = {
  getCartData: function () {
    return CartMgr.getCartData();
  },

  setCartData: function (params) {
    const cartItem = params.data;

    // let newCartItems = cart.items.map(function(item) {
    //   if (cartItem.pid === item.pid) {
    //     item.quantity += cartItem.quantity;
    //     item.price = item.quantity * item.price;
    //   }
    // })

    return CartMgr.setCartData(cartItem);
  }
}
