const conn = require("../mariadb");
const { StatusCodes } = require('http-status-codes');

const order = (req, res) => {
    const { book_id, quantity, user_id } = req.body;

    let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);`;
    let values = [book_id, quantity, user_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

const getOrders = (req, res) => {
    return res.send('getOrders');
};

const getOrderDetail = (req, res) => {
    return res.send('getOrderDetail');
};

module.exports = {
    order,
    getOrders,
    getOrderDetail
};