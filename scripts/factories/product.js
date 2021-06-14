const ProductMgr = require('~/scripts/managers/ProductMgr');

// const productTile = require('~/models/product/productTile');
// const productVariation = require('~/models/product/productVariation');
const fullProduct = require('~/models/product/fullProduct');

module.exports = {
    getMasters: function (params) {
        const masterProducts = ProductMgr.getMasterProducts();
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = params.page * params.limit;
        const pagesCount = Math.ceil(masterProducts.length / params.limit);

        return {
            masterProducts: masterProducts.slice(startIndex, endIndex),
            current: params.page,
            count: pagesCount,
        };
    },

    getDetails: function (params) {
        const productId = params.id;
        const variationId = params.pid;
        const masterProduct = ProductMgr.getProduct(productId);
        const productVariation = ProductMgr.getProductVariation(variationId);
        let product = {};

        product = fullProduct(product, masterProduct, productVariation[0]);

        return product;
    },
}
