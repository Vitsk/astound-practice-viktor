const ProductFactory = require('~/scripts/factories/product');
const productsHelper = {};

productsHelper.getProductsTile = function () {
    return ProductFactory.getMasters();
};

productsHelper.getProductDetails = function (productId, variationId) {
    return ProductFactory.getDetails({
        id: productId,
        pid: variationId
    })
};

// productsHelper.getProductVariation = function (productId) {
//     return ProductFactory.getProductVariation({
//         id: productId,
//     })
// };

module.exports = productsHelper;
