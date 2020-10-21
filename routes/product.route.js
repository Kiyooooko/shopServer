const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promisifyResponse = require('../middlewares/promisifyResponse');
const { getProducts, addProduct, deleteProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');
const Products = require('../models/product.model');
const { returnString } = require('../helpers/helper');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
    .get(
        promisifyResponse(getProducts)
    )
    .post(
        promisifyResponse(addProduct)
    )
    .put(
        promisifyResponse(returnString('PUT operation not supported on /products'), 403)
    )
    .delete(
        promisifyResponse(deleteProducts)
    );

productRouter.route('/:productId')
    .get(
        promisifyResponse(getProductById)
    )
    .post(
        promisifyResponse(returnString('POST operation not supported on /products/productId'), 403)
    )
    .put(
        promisifyResponse(updateProduct)
    )
    .delete(
        promisifyResponse(deleteProduct)
    );
    

module.exports = productRouter;

