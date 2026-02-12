const { StatusCodes } = require('http-status-codes');
const express = require('express');
const router = express.Router();
router.use(express.json());

const { join, login, requestPasswordReset, passwordReset } = require('../controller/UserController');

const conn = require("../mariadb");
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const err = validationResult(req);

    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(400).json(err);
    }
}

router.post('/join',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력해주세요.'),
        body('password').notEmpty().isString().withMessage('비밀번호 형식으로 입력해주세요.'),
        validate
    ]
    , join);
router.post('/login', login);
router.post('/reset', requestPasswordReset);
router.put('/reset', passwordReset);

module.exports = router;