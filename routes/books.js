const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    res.json('전체 도서 조회');
});

router.get('/:bookId', (req, res) => {
    res.json('개별 도서 조회');
});

router.get('/:categoryId&:new', (req, res) => {
    res.json('카테고리별 도서 조회');
});

module.exports = router;