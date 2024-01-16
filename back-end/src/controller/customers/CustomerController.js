const db = require("../../models/db.js");
const { default: customersApiRoutes } = require("../../routes/customer.js");

const createCustomer = (req, res) => {
  const sql =
    "INSERT INTO customer ( `email`, `first_name`, `last_name`, `street_address`, `district`, `city`, `phone`, `cart_items`, `payment_method`, `total_price`) VALUE (?)";
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
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ Message: data.insertId });
  });
};

const deleteCustomer = (req, res) => {
  const sql = "DELETE FROM customer WHERE order_id = ?";
  const order_id = req.query.order_id;
  db.query(sql, order_id, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
};

module.exports = {
  createCustomer,
  deleteCustomer,
};
