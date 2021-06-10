module.exports = function (product, apiProduct) {
  Object.defineProperty(product, 'longDescription', {
      enumerable: true,
      value: apiProduct.longDescription
  });
}