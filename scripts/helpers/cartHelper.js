// const CartFactory = require('~/scripts/factories/cart');
const ProductMgr = require('~/scripts/managers/ProductMgr')
const cartHelper = {};
let cartData = [];

// Helpers
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

function _getProductVariation(item) {
  let productItem = ProductMgr.getProductVariation(item.pid)[0];
  let clone = Object.assign({}, productItem);

  clone.quantity = item.quantity;
  clone.price *= item.quantity;
  if (clone.quantity >= 2) {
    clone.price = _addDiscount(clone.price, 10);
    clone.discount = 10;
  }

  return clone;
}

function _addDiscount(price, discount) {
  return +(price * ((100 - discount) / 100)).toFixed(2)
}

// Get products from cart
cartHelper.getCartData = function (cookieItem) {
  cartData = cookieItem;

  let products = {
    items: [],
    discount: 0,
    shipping: 10,
    totalPrice: 0,
  };

  cartData.map(function (item) {
    let productItem = _getProductVariation(item)

    products.items.push(productItem);
  })

  products.items.forEach(function (item) {
    products.totalPrice += item.price
  })

  if (products.totalPrice > 300) {
    products.discount = 20
    products.totalPrice = _addDiscount(products.totalPrice, products.discount)
  }

  if (products.totalPrice > 350) {
    products.shipping = 0
  }

  return products;
};

// Set product to the cart
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

// Update cart data
cartHelper.updateCartData = function (cartItem) {
  let result = {
    product: {},
    cookies: [],
    discount: 0,
    shipping: 0,
    totalPrice: 0,
  }

  cartData.forEach(function (item) {
    if (item.pid === cartItem.pid) {
      if (cartItem.quantity > 5 || cartItem.quantity < 0) {
        throw new Error('Max quantity is 5')
      }

      item.quantity = cartItem.quantity;
    }

    let price = _getProductVariation(item).price;
    result.totalPrice += price;
  });

  if (result.totalPrice > 300) {
    result.discount = 20
    result.totalPrice = _addDiscount(result.totalPrice, result.discount)
  } else {
    result.discount = 0
  }

  if (result.totalPrice > 350) {
    result.shipping = 0
  } else {
    result.shipping = 10
  }

  result.product = _getProductVariation(cartItem);
  result.cookies = cartData;

  return result;
};

// Delete product from cart
cartHelper.deleteCartData = function (pid) {
  cartData.forEach(function (item, index) {
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
