const express = require('express');

const router = express.Router();

const { createCart, getAllCartsByUserId, getCartByIdAndUserId } = require('../controllers/cartController');

router.get('/:userId', getAllCartsByUserId);
router.get('/:userId/:cartId', getCartByIdAndUserId);
router.post('/', createCart);

module.exports = router;