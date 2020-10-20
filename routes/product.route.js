const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promisifyResponse = require('../middlewares/promisifyResponse');
const { getProducts } = require('../controllers/product.controller');
const Products = require('../models/product.model');
const { returnString } = require('../helpers/helper');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
    .get(
        promisifyResponse(getProducts)
    )
    .post((req, res, next) => {
        Products.create(req.body)
            .then((product) => {
                console.log('Product created', product);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(product);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(
        promisifyResponse(returnString('PUT operation not supported on /products'), 403)
    )
    .delete((req, res, next) => {
        Products.remove()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

productRouter.route('/:productId')
    .get((req, res, next) => {
        Products.findById(req.params.productId)
            .then((product) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(product);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /products/ ${req.params.productId}`);
    })
    .put((req, res, next) => {
        Products.findByIdAndUpdate(req.params.productId, {
            $set: req.body
        }, { new: true })
            .then((product) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(product);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Products.findByIdAndRemove(req.params.productId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

module.exports = productRouter;

