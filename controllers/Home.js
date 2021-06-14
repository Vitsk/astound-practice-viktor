const productsHelper = require('~/scripts/helpers/productsHelper');
const server = require('express')();

const limit = 6;

server.get('/', function (req, res) {
    log.info('Controller Home is called');
    const products = productsHelper.getProductsTile(req.params.page, limit);

    res.render('home', {
        products: products
    })
});

// Pagination
server.get('/:page', function (req, res) {
    log.info('Controller Home is called');
    const products = productsHelper.getProductsTile(req.params.page, limit);

    res.render('home', {
        products: products
    })
});

module.exports = server
