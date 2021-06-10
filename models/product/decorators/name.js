module.exports = function (product) {
  var products = Array.prototype.slice.call(arguments, 1);
  
  products.forEach(function (apiProduct) {
    if (!apiProduct) {
      return;
    }
    product.name = apiProduct.name || product.name;
  });
}