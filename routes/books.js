const express = require('express');
const { allBooks, bookDetail } = require('../controller/BookController');
const router = express.Router();
router.use(express.json());

router.get('/', allBooks);
router.get('/:bookId', bookDetail);

module.exports = router;