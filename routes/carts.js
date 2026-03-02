const express = require('express');
const router = express.Router();
router.use(express.json());

const { addCart, removeCartItem, cartLists, buyCartLists } = require('../controller/CartController');

router.post('/', addCart);

router.get('/', cartLists);

router.delete('/:bookId', removeCartItem);

// router.get('/', (req, res) => {
//     res.json('장바구니 구매 예상 상품 조회');
// });

module.exports = router;