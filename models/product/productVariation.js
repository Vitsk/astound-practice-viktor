const decorators = require('~/models/product/decorators');

module.exports = function productVariation(variation, apiProduct, options) {
    decorators.name(variation, apiProduct, options);
    decorators.description(variation, apiProduct, options);
    decorators.image(variation, apiProduct, options);
    decorators.price(variation, apiProduct, options);
    return variation;
}
