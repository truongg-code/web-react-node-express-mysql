const db = require("../../models/db.js");
const { default: customersApiRoutes } = require("../../routes/customer.js");

const createCustomer = (req, res) => {
  const sql =
    "INSERT INTO customer ( `email`, `first_name`, `last_name`, `street_address`, `district`, `city`, `phone`, `cart_items`, `payment_method`, `total_price`, `order_code`, `is_pay` ) VALUE (?)";
  const values = [
    req.body.email,
    req.body.firstName,
    req.body.lastName,
    req.body.streetAddress,
    req.body.district,
    req.body.city,
    req.body.phone,
    req.body.userCart,
    req.body.paymentMethod,
    req.body.totalPrice,
    req.body.orderCode,
    req.body.isPay,
  ];
  db.query(sql, [values], (err, data) => {
    console.log(req.body.orderCode);
    if (err) return res.json(err);
    return res.json({ Message: data.insertId });
  });
};

const checkBankingCustomer = (req, res) => {
  const sql = "SELECT * FROM order_bank WHERE order_code = ?";
  const order_code = req.query.order_code;
  db.query(sql, order_code, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getCountOrderCodeDuplicated = (req, res) => {
  const sql = "SELECT COUNT(*) as count FROM customer WHERE order_code = ?";
  const order_code = req.query.order_code;
  db.query(sql, order_code, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
};

module.exports = {
  createCustomer,
  checkBankingCustomer,
  getCountOrderCodeDuplicated,
};
