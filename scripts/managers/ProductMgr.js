const products = require('~/db/products.json');

const ProductMgr = {};

ProductMgr.getMasterProducts = function () {
  return products.filter(function (product) {
    return product.isMaster;
  });
};

ProductMgr.getProduct = function (productId) {
  return products.find(function (product) {
    return product.id === productId;
  });
};

ProductMgr.getProductVariations = function (productId) {
  return products.filter(function (product) {
    return product.master === productId
  });
};

module.exports = ProductMgr;
