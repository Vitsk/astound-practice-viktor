module.exports = function (product) {
  var products = Array.prototype.slice.call(arguments, 1);
   
  products.forEach(function (apiProduct) {
    if (!apiProduct) {
      return;
    }
    product.master = apiProduct.master || product.master;
  });
}