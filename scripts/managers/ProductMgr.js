const products = require('~/db/products.json');

const ProductMgr = {};

ProductMgr.getMasterProducts = function () {
  return products.filter(function (product) {
    product.image = product.image || 'https://via.placeholder.com/256?text=Picture+not+found';
    return product.isMaster;
  });
};

ProductMgr.getProduct = function (productId) {
  return products.find(function (product) {
    return product.id === productId;
  });
};

ProductMgr.getProductVariation = function (variationId) {
  return products.filter(function (product) {
    return product.id === variationId
  });
};

module.exports = ProductMgr;
