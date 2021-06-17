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
    discount: 0,
    shipping: 10,
    totalPrice: 0,
  };

  cartData

  cartData.map(function(item) {
    let productItem = ProductMgr.getProductVariation(item.pid)[0];

    productItem.quantity = item.quantity;
    products.items.push(productItem);
  })

  products.items.forEach(function(item) {
    products.totalPrice += item.price * item.quantity
  })

  if(products.totalPrice > 300) {
    products.discount = 20
    products.totalPrice = +(products.totalPrice * ((100 - products.discount) / 100)).toFixed(2)
  }

  if(products.totalPrice > 350) {
    products.shipping = 0
  }

  return products;
};

cartHelper.setCartData = function (cartItem) {
  if (cartData.length === 0 || _isItemUnique(cartItem.pid)) {
    cartData.push(cartItem);
  } else {
    cartData.forEach(function (item) {
      if (item.pid === cartItem.pid) {
        if (item.quantity + cartItem.quantity > 5) {
          throw new Error('Max quantity is 5')
        }
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

cartHelper.countTaxes = function (data) {
  let temp = data.amount * ((100 - 5) / 100);

  return {
    success: true,
    tax: +(data.amount - temp).toFixed(2)
  }
}

module.exports = cartHelper;
