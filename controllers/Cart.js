const cartHelper = require('~/scripts/helpers/cartHelper');
const server = require('express')();

server.get('/cart', function (req, res) {
  const cartProducts = req.cookies.cartItem;
  
  if (req.query.data) {
    res.send(JSON.parse(cartProducts));
  } else {
    res.render('cart', {
      cartProducts: JSON.parse(cartProducts)
    });
  }
});

server.post('/cart', function (req, res) {
  const cartProducts = cartHelper.setCartData(req.body);
  
  res.cookie("cartItem", JSON.stringify(cartProducts));
  res.send("success");
});

module.exports = server;