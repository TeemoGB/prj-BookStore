const conn = require("../mariadb");
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
    let { category_id } = req.query;
    let sql = `SELECT * FROM books`;

    if (category_id) {
        sql = `SELECT * FROM books WHERE category_id = ?`;
    }

    conn.query(sql, category_id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

const bookDetail = (req, res) => {
    let { bookId } = req.params;

    const sql = `SELECT * FROM books WHERE id = ?`;
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