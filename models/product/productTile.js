const decorators = require('~/models/product/decorators');

module.exports = function productTile(product, masterProduct) {
  decorators.base(product, masterProduct);
  decorators.name(product, masterProduct);
  decorators.image(product, masterProduct);
  decorators.variations(product, masterProduct);
  return product;
}
