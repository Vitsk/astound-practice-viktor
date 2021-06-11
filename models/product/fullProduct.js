const decorators = require('~/models/product/decorators');

module.exports = function fullProduct(product, masterProduct, productVariation) {
    decorators.base(product, masterProduct, productVariation);
    decorators.master(product, masterProduct, productVariation);
    decorators.image(product, masterProduct, productVariation);
    decorators.price(product, masterProduct, productVariation);
    decorators.description(product, masterProduct, productVariation);
    decorators.variations(product, masterProduct, productVariation);
    return product;
}
