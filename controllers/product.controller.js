const Products = require('../models/product.model');

module.exports = {
    getProducts: () => Products.find()
}
