const express = require('express');

const router = express.Router();

const { createProduct, getProductById, getProducts, getProductsByCategoryId } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.get('/category/:categoryId', getProductsByCategoryId);
router.post('/', createProduct);

module.exports = router;