const ProductFactory = require('~/scripts/factories/product');
const productsHelper = {};

productsHelper.getProductsTile = function (page = 1, limit) {
    return ProductFactory.getMasters({
        page: page,
        limit: limit
    });
};

productsHelper.getProductDetails = function (productId, variationId) {
    return ProductFactory.getDetails({
        id: productId,
        pid: variationId
    })
};

module.exports = productsHelper;
