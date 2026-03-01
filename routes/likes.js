const express = require('express');
const router = express.Router();
router.use(express.json());

const { addLike, removeLike } = require('../controller/LikeController');

router.post('/:bookId', addLike);

router.delete('/:bookId', removeLike);

module.exports = router;