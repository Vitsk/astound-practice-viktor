const decorators = require('~/models/product/decorators');

module.exports = function productTile(product, masterProducts) {
    decorators.base(product, masterProducts);
    decorators.name(product, masterProducts);
    decorators.image(product, masterProducts);
    decorators.variations(product, masterProducts);
    return product;
}
