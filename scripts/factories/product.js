const ProductMgr = require('~/scripts/managers/ProductMgr');

const productTile = require('~/models/product/productTile');
const fullProduct = require('~/models/product/fullProduct');

function _paginate(masterProducts, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return masterProducts.slice(startIndex, endIndex);
}

module.exports = {
  getMasters: function (params) {
    const masterProducts = ProductMgr.getMasterProducts();
    const pagesCount = Math.ceil(masterProducts.length / params.limit);

    const limitMasterProducts = _paginate(masterProducts, params.page, params.limit);
    
    const masterProductTiles = limitMasterProducts.map(function(item) {
      let product = {};

      let variationItem = ProductMgr.getProductVariation(item.variations[0].pid);
      
      product = fullProduct(product, item, variationItem[0]);

      return product;
    });
    

    return {
      masterProducts: masterProductTiles,
      count: pagesCount,
    }
  },

  getDetails: function (params) {
    const productId = params.id;
    const variationId = params.pid;
    const masterProduct = ProductMgr.getProduct(productId);
    const productVariation = ProductMgr.getProductVariation(variationId);
    let product = {};

    product = fullProduct(product, masterProduct, productVariation[0]);

    return product;
  },
}
