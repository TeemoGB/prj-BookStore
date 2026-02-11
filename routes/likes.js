const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/:bookId', (req, res) => {
    res.json('좋아요 추가');
});

router.get('/:bookId', (req, res) => {
    res.json('좋아요 제거');
});

module.exports = router;