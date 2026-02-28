const conn = require("../mariadb");
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
    let { category_id, news, limit, page } = req.query;
    let sql = `SELECT * FROM books `;
    let values = [];

    if (category_id && news) {
        sql += `WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
        values = [category_id, news];
    } else if (category_id) {
        sql += `WHERE category_id = ?`;
        values = [category_id];
    } else if (news) {
        sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
        values = [news];
    }

    if (limit && page) {
        let offset = limit * (page - 1);
        sql += ` LIMIT ${offset}, ${limit}`;
    }

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

const bookDetail = (req, res) => {
    let { bookId } = req.params;

    const sql = `SELECT * FROM books LEFT JOIN categories
    ON books.category_id = categories.id WHERE books.id = ?;
    `
    conn.query(sql, bookId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results[0]);
    });
};

module.exports = {
    allBooks,
    bookDetail
};