const express = require('express');
const router = express.Router();
router.use(express.json());

const { addCart, removeCartItem, cartLists } = require('../controller/CartController');

router.post('/', addCart);

router.get('/', cartLists);

router.delete('/:id', removeCartItem);

module.exports = router;