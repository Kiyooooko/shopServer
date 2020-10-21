const Products = require('../models/product.model');


module.exports = {
    getProducts: () => Products.find(),
    addProduct: ({ body }) => Products.create(body),
    deleteProducts: () => Products.remove(),
    getProductById: ({ params }) => Products.findById(params.productId),
    updateProduct: ({ params, body }) => Products.findByIdAndUpdate(params.productId, { $set: body }, { new: true }),
    deleteProduct: ({ params }) => Products.findByIdAndRemove(params.productId)
}

/*Products.findByIdAndUpdate(req.params.productId, {
    $set: req.body
}, { new: true })*/