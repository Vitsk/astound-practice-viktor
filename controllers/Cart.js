const cartHelper = require('~/scripts/helpers/cartHelper');
const server = require('express')();

server.get('/cart', function (req, res) {
  const cartProducts = cartHelper.getCartData();
  if (req.query.data) {
    res.send(cartProducts);
  } else {
    res.render('cart', {
      cartProducts: cartProducts
    });
  }
});

server.post('/cart', function (req, res) {
  const cartProducts = cartHelper.setCartData(req.body);
  
  res.cookie("cartItem", JSON.stringify(cartProducts));
  res.send(cartProducts);
  console.log(res.cookies);
});

module.exports = server;