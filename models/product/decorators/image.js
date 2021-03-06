module.exports = function (product) {
  var products = Array.prototype.slice.call(arguments, 1);
   
  products.forEach(function (apiProduct) {
    if (!apiProduct) {
      return;
    }
    product.image = apiProduct.image || product.image || 'https://via.placeholder.com/256?text=Picture+not+found';
  });
}