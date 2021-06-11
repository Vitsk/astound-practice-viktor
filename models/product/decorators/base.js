module.exports = function (product) {
    var products = Array.prototype.slice.call(arguments, 1);
    
    products.forEach(function (apiProduct) {
      if (!apiProduct) {
        return;
      }
      product.ID = apiProduct.id || product.ID;
      product.name = apiProduct.name || product.name;
    });
}
