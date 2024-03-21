const db = require("../../models/db.js");
const { default: customersApiRoutes } = require("../../routes/customer.js");
const sendEmail = require("../customers/CustomerServices.js");

const createOrder = (req, res) => {
  // const sql =
  //   "INSERT INTO order ( `email`, `first_name`, `last_name`, `address`, `phone`, `cart_items`, `payment_method`, `total_price`, `order_code`, `is_pay` ) VALUE (?)";
  const values = [
    req.body.email,
    req.body.firstName,
    req.body.lastName,
    req.body.address,
    req.body.phone,
    req.body.userCart,
    req.body.paymentMethod,
    req.body.totalPrice,
    req.body.orderCode,
    req.body.isPay,
  ];
  // db.query(sql, [values], (err, data) => {
  //   console.log(req.body.orderCode);
  //   if (err) return res.json(err);
  sendEmail(req.body.email, req.body.userCart);
  //   return res.json({ Message: data.insertId });
  // });
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
  createOrder,
  checkBankingCustomer,
  getCountOrderCodeDuplicated,
};
