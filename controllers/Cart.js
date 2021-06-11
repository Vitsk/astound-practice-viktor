const cartHelper = require('~/scripts/helpers/cartHelper');
const server = require('express')();

server.get('/cart', function (req, res) {
  const cartProducts = cartHelper.getCartData();
  res.send(cartProducts);
});

server.post('/cart', function (req, res) {
  const cartProducts = cartHelper.setCartData(req.body);
  res.send(cartProducts);
});

module.exports = server;