const productsHelper = require('~/scripts/helpers/productsHelper');
const server = require('express')();

server.get('/', function (req, res) {
  log.info('Controller Home is called');
  const limit = 6;
  const products = productsHelper.getProductsTile(req.query.page, limit);

  if (req.query.data) {
    res.send(products)
  } else {
    res.render('home', {
      products: products
    })
  }


});

module.exports = server
