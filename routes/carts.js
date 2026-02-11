const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
    res.json('장바구니에 상품 추가');
});

router.get('/', (req, res) => {
    res.json('장바구니 목록 조회');
});

router.delete('/:bookId', (req, res) => {
    res.json('장바구니 도서 삭제');
});

// router.get('/', (req, res) => {
//     res.json('장바구니 구매 예상 상품 조회');
// });

module.exports = router;