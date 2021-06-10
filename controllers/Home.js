const productsHelper = require('~/scripts/helpers/productsHelper')
const server = require('express')()

server.get('/', function (req, res) {
    log.info('Controller Home is called');
    const products = productsHelper.getProductsTile();
    res.render('home', {
        products: products
    })
});

module.exports = server
