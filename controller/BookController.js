const conn = require("../mariadb");
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
    let { category_id, news, limit, page } = req.query;
    let sql = `SELECT *, (SELECT count(*) FROM likes WHERE books.id = likes.liked_book_id) AS likes FROM books `;
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
    let { user_id } = req.body;
    let { bookId } = req.params;

    const sql = `SELECT *,
    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
    (SELECT EXISTS(SELECT * FROM likes WHERE likes.user_id = ? AND liked_book_id = books.id)) AS liked
    FROM books
    LEFT JOIN categories
    ON books.category_id = categories.category_id
    WHERE books.id = ?;
    `
    let values = [user_id, bookId];
    conn.query(sql, values, (err, results) => {
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