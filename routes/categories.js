const express = require('express');
const { categories } = require('../controller/CategoryController');
const router = express.Router();
router.use(express.json());

router.get('/', categories);

module.exports = router;