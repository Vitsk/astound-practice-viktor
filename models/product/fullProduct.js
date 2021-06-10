const decorators = require('~/models/product/decorators');

module.exports = function fullProduct(product, masterProduct, productVariations) {
    decorators.base(product, masterProduct, productVariations);
    decorators.image(product, masterProduct, productVariations);
    decorators.price(product, masterProduct, productVariations);
    decorators.description(product, masterProduct, productVariations);
    decorators.variations(product, masterProduct, productVariations);
    return product;
}
