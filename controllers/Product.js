const productsHelper = require('~/scripts/helpers/productsHelper')
const server = require('express')()

server.get('/product/:id', function (req, res) {
    log.info('Controller Product is called');
    const product = productsHelper.getProductDetails(req.params.id);
    
    res.render('product', {
        product: product,
    })
});

server.get('/product/variations/:pid', function (req, res) {
  log.info('Controller ProductVariations is called');
  const product = productsHelper.getProductVariation(req.params.pid);
  
  res.send(product)
});

module.exports = server