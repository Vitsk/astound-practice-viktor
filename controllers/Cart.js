const cartHelper = require('~/scripts/helpers/cartHelper');
const server = require('express')();

server.get('/cart', function (req, res) {
  const cookieItem = JSON.parse(req.cookies.cartProducts || JSON.stringify([]));
  const cartProducts = cartHelper.getCartData(cookieItem);

  res.cookie("cartProducts", JSON.stringify(cookieItem), {expires: new Date(Date.now() + 900000)});
  if (req.query.data) {
    res.send(cartProducts);
  } else {
    res.render('cart', {
      cartProducts: cartProducts
    });
  }
});

server.post('/cart', function (req, res) {
  // const cookie = JSON.parse(req.cookies.cartProducts) || [];
  const cartProducts = cartHelper.setCartData(req.body);
  
  res.cookie("cartProducts", JSON.stringify(cartProducts), {expires: new Date(Date.now() + 900000)});
  res.send(JSON.stringify("The product has been added to the cart"));
});


server.delete('/cart', function (req, res) {
  // const cookie = JSON.parse(req.cookies.cartProducts) || [];
  const cartProducts = cartHelper.deleteCartData(req.query.pid);
  // console.log(cartProducts)

  res.cookie("cartProducts", JSON.stringify(cartProducts), {expires: new Date(Date.now() + 900000)});
  res.send("Success");
});

module.exports = server;