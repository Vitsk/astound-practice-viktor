const cartHelper = require('~/scripts/helpers/cartHelper');
const server = require('express')();

// Get products from cart
server.get('/cart', function (req, res) {
  const cookieItems = JSON.parse(req.cookies.cartProducts || JSON.stringify([]));
  const cartProducts = cartHelper.getCartData(cookieItems);

  res.cookie("cartProducts", JSON.stringify(cookieItems), {expires: new Date(Date.now() + 900000)});
  if (req.query.data) {
    res.send(cartProducts);
  } else {
    res.render('cart', {
      cartProducts: cartProducts
    });
  }
});

// Add product to the cart
server.post('/cart', function (req, res) {
  const cartProducts = cartHelper.setCartData(req.body);

  try {
    res.cookie("cartProducts", JSON.stringify(cartProducts), {expires: new Date(Date.now() + 900000)});
  } catch(e) {
    res.error(e)
  }
  res.send(JSON.stringify("The product has been added to the cart"));
});

// Change quantity of product
server.put('/cart', function (req, res) {
  const cartData = cartHelper.updateCartData(req.body);

  try {
    res.cookie("cartProducts", JSON.stringify(cartData.cookies), {expires: new Date(Date.now() + 900000)});
  } catch(e) {
    res.error(e)
  }
  res.send(JSON.stringify({
    product: cartData.product,
    discount: cartData.discount,
    shipping: cartData.shipping,
    totalPrice: cartData.totalPrice
  }));
});

// Counting taxes
server.post('/cart/taxes', function (req, res) {
  const data = cartHelper.countTaxes(req.body);

  res.send(JSON.stringify(data));
});

// Remove product from cart
server.delete('/cart', function (req, res) {
  const cartProducts = cartHelper.deleteCartData(req.query.pid);

  res.cookie("cartProducts", JSON.stringify(cartProducts), {expires: new Date(Date.now() + 900000)});
  res.send("Success");
});

module.exports = server;